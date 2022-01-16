function setup_left_menu() {
    menus = document.getElementsByClassName('menu');

    //Remove top menu entties
    main = menus[0];
    main.removeChild(main.children[1]);
    main.removeChild(main.children[3]);
    main.removeChild(main.children[3]);

    //Remove side menu entties
    side = menus[1];
    side.removeChild(side.children[7]);
    side.removeChild(side.children[6]);
    side.removeChild(side.children[5]);
}
    
    // left_panel = document.querySelector("#layout-c22a > div > div.local-home-table > div > div:nth-child(1)");
    // left_panel.removeChild(left_panel.children[0])

    // main_panels = document.querySelector("#layout-c22a > div > div.local-home-table > div")
    // main_panels.removeChild(main_panels.children[2])

var dragged;
function setup_drag() {
    panels = document.querySelector("#layout-c22a > div > div.local-home-table > div");
    for(const panel of panels.children) {
        panel.classList.add("dropzone");

        for(const item of panel.children) {
            item.setAttribute("draggable", "true");
            item.setAttribute("indragstart", "event.dataTransfer.setData('text/plain',null)");
        }
    }
    
    /* events fired on the draggable target */
    document.addEventListener("drag", function(event) {
    
    }, false);
    
    document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
    }, false);
    
    document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
    }, false);
    
    /* events fired on the drop targets */
    document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
    }, false);
    
    document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = "purple";
    }
    
    }, false);
    
    document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
    }
    
    }, false);
    
    document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
    else {
        dragged.parentNode.removeChild( dragged );
    }
    }, false);
}


(function() {
    setup_left_menu();
    setup_drag();
})();
