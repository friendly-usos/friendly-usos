function setup_left_menu() {
    menus = document.getElementsByClassName('menu');

    // //Remove top menu entties
    // main = menus[0];
    // main.removeChild(main.children[1]);
    // main.removeChild(main.children[3]);
    // main.removeChild(main.children[3]);

    //Remove side menu entties
    side = menus[1];
    side.removeChild(side.children[7]);
    side.removeChild(side.children[6]);
    side.removeChild(side.children[5]);
}

function setup_panels() {
    right_panel = document.querySelector("#layout-c22a > div > div.local-home-table > div > div:nth-child(3)");
    right_panel.removeChild(right_panel.children[3])
    right_panel.removeChild(right_panel.children[2])
}

function find_dropzone_parent(element) {

    var el = element;
    while(el.nodeName != "BODY") {
        if(el.classList.contains("dropzone")) {
            return el;
        }
        el = el.parentNode;
    }

    return null;
}

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
        target = find_dropzone_parent(event.target);
        if (target) {
            target.style.background = "purple";
        }
    }, false);
    
    document.addEventListener("dragenter", function(event) {
        // highlight potential drop target when the draggable element enters it
        target = find_dropzone_parent(event.target);
        if (target) {
            target.style.background = "purple";
        }
        
    }, false);
    
    document.addEventListener("dragleave", function(event) {
        // reset background of potential drop target when the draggable element leaves it
        target = find_dropzone_parent(event.target);
        if (target) {
            target.style.background = "";
        }
        
    }, false);
    
    document.addEventListener("drop", function(event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target

        target = find_dropzone_parent(event.target);
        if (target) {
            target.style.background = "";
            dragged.parentNode.removeChild( dragged );
            target.appendChild( dragged );
        }
        else {
            dragged.parentNode.removeChild( dragged );
        }
    }, false);
}


(function() {
    setup_left_menu();
    setup_panels();
    setup_drag();
})();
