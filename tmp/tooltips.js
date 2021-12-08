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

    showTooltip('RW');

    // Force initial sizing
    htmlSize = {
      width: html.clientWidth,
      height: html.clientHeight
    };
    

    // Register event handlers
    window.addEventListener('resize', onWindowResize);
  }

  function showTooltip(entry) {
    tooltip.getElementsByTagName('dt')[0].textContent = entry;
    tooltip.getElementsByTagName('dd')[0].innerHTML = dictionary[entry];
    tooltip.style.display = 'block';
    tooltipSize = tooltip.getBoundingClientRect();
    document.body.addEventListener('mousemove', onMouseMove);

    setTimeout(hideTooltip, 5000);
  }

  function hideTooltip() {
    document.body.removeEventListener('mousemove', onMouseMove);
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

  function onMouseMove(event) {
    let mousePos = {
      x: event.clientX,
      y: event.clientY
    }

    let tooltipX = 12 + mousePos.x;
    if (tooltipX + tooltipSize.width > htmlSize.width) {
      tooltipX = mousePos.x - tooltipSize.width - 4;
    }

    let tooltipY = 16 + mousePos.y;
    if (tooltipY + tooltipSize.height > htmlSize.height) {
      tooltipY = mousePos.y - tooltipSize.height - 4;
    }

    Object.assign(tooltip.style, {
      top: tooltipY + 'px',
      left: tooltipX + 'px'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

}