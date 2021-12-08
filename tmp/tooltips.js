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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

}