{
  let html;
  let htmlSize; // Updated only on redraws
  let tooltip;
  let tooltipSize; // Updated only when contents changes

  const dictionary = {
    'RW': '<em>Rada Wydziału</em>, złożona z jego pracowników, doktorantów i studentów.',
    'UL': '<em>Uniwersyteckie Lektoraty</em>, system rejestracji żetonowej.'
  };

  function setup() {
    appendHTML();
    parseDocument();

    // Find HTML elements in the tree
    html = document.getElementsByTagName('html')[0];
    tooltip = document.getElementById('friendly-usos-tooltip');

    // Force initial sizing
    htmlSize = {
      width: html.clientWidth,
      height: html.clientHeight
    };
    
    // Register event handlers
    window.addEventListener('resize', onWindowResize);
    document.querySelectorAll('.friendly-usos-dict-entry').forEach(elem => {
      let entry = elem.dataset.entry;
      elem.addEventListener('mouseover', e => {
        showTooltip(e.target, entry, e);
      });
    })
  }

  function appendHTML() {
    const tooltip = document.createElement('dl');
    tooltip.id = 'friendly-usos-tooltip';
    tooltip.appendChild(document.createElement('dt'));
    tooltip.appendChild(document.createElement('dd'));

    const layer = document.createElement('div');
    layer.id = 'friendly-usos-tooltip-layer';
    layer.appendChild(tooltip);

    document.body.appendChild(layer);
    
    const styles = document.createElement('style');
    styles.innerHTML = `
#friendly-usos-tooltip-layer { width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; overflow: hidden; user-select: none; pointer-events: none; }
#friendly-usos-tooltip { display: none; position: absolute; width: 18em; margin: 0; padding: 1em; background: #f2f2f2; border: 1px solid #D8D8D8; }
#friendly-usos-tooltip dt { display: inline; font-weight: bold; }
#friendly-usos-tooltip dt::after { content: ' - '; }
#friendly-usos-tooltip dd { display: inline; margin: 0; }
.friendly-usos-dict-entry { text-decoration: underline; text-decoration-style: dotted; }
  `;
    document.body.appendChild(styles);
  }

  function parseDocument() {
    let treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      { acceptNode: () => NodeFilter.FILTER_ACCEPT },
      false
    );

    // Find all nodes to change
    let changes = { list: [] }; // Array inside an object to pass by reference
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
      parseNode(currentNode, changes);
      currentNode = treeWalker.nextNode();
    }

    // Apply changes
    changes.list.forEach(change => {
      const oldNode = change[0];
      const newNodes = change[1];
      newNodes.forEach(newNode => oldNode.parentNode.insertBefore(newNode, oldNode));
      oldNode.parentNode.removeChild(oldNode);
    });
  }

  function parseNode(node, changes) {
    // Split into parts by whitespace
    const re = /\s+/g;
    const text = node.textContent;

    let parts = [];
    let lastIndex = 0;
    while ((match = re.exec(text)) != null) {
      parts.push(text.substring(lastIndex, match.index));
      parts.push(text.substring(match.index, re.lastIndex));
      lastIndex = re.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex, text.length));
    }

    // Check each part to see if an entry, replace with <span>
    let hasEntries = false;
    const entryNames = new Set(Object.keys(dictionary));
    const newParts = parts.map(text => {
      if (entryNames.has(text)) {
        hasEntries = true;
        let element = document.createElement('span');
        element.textContent = text;
        element.dataset.entry = text;
        element.classList.add('friendly-usos-dict-entry');
        return element;
      } else {
        return text;
      }
    });
    
    // Merge remaining text parts into text nodes and push change
    if (hasEntries) {
      let nodes = [];
      let nextText = '';
      newParts.forEach(part => {
        if (typeof part === 'string') {
          nextText += part;
        } else {
          let textNode = document.createTextNode(nextText);
          nextText = '';
          nodes.push(textNode);
          nodes.push(part);
        }
      });
      if (nextText !== '') {
        let textNode = document.createTextNode(nextText);
        nodes.push(textNode);
      }

      changes.list.push([node, nodes]);
    }
  }

  function showTooltip(target, entry, event) {
    // Update contents
    tooltip.getElementsByTagName('dt')[0].textContent = entry;
    tooltip.getElementsByTagName('dd')[0].innerHTML = dictionary[entry];
    tooltipSize = tooltip.getBoundingClientRect();

    // Compute styles
    let styles = computeTooltipPosition({ x: event.clientX, y: event.clientY });
    styles['display'] = 'block';
    Object.assign(tooltip.style, styles);

    target.addEventListener('mousemove', onMouseMove);
    target.addEventListener('mouseout', () => { hideTooltip(target); });
  }

  function hideTooltip(target) {
    target.removeEventListener('mousemove', onMouseMove);
    tooltip.style.display = 'none';
  }

  function tearDown() {
    window.removeEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    htmlSize = {
      width: html.clientWidth,
      height: html.clientHeight
    };
  }

  function computeTooltipPosition(mousePos) {
    let tooltipX = 12 + mousePos.x;
    if (tooltipX + tooltipSize.width > htmlSize.width) {
      tooltipX = mousePos.x - tooltipSize.width - 4;
    }

    let tooltipY = 16 + mousePos.y;
    if (tooltipY + tooltipSize.height > htmlSize.height) {
      tooltipY = mousePos.y - tooltipSize.height - 4;
    }

    return {
      top: tooltipY + 'px',
      left: tooltipX + 'px'
    };
  }

  function onMouseMove(event) {
    let mousePos = {
      x: event.clientX,
      y: event.clientY
    }

    Object.assign(
      tooltip.style,
      computeTooltipPosition(mousePos)
    );
  }

  if (!document.getElementById('friendly-usos-tooltip')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }

}