var titles = {
    "Rejestracja": "Nowy opis rejestracji",
    "Sprawdziany": false,
    "Wymiana studencka": "Nowy opis wymiany studenckiej"
}

function deleteNode(node) {
    node.parentNode.removeChild(node);
}

function addToDivs(node, divs) {
   let treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_ELEMENT,
        { acceptNode: () => NodeFilter.FILTER_ACCEPT },
        false
    );
    let moduleDescription = false;

    let currentNode = treeWalker.nextNode();
    let title = currentNode.textContent;
    currentNode.style["font-size"] = "20px"
    currentNode.style['color'] = '#3C6F6F'

    console.log(title)

    if(title in titles) {
        if(!titles[title]) return

        moduleDescription = titles[title]
    }

    while(currentNode = treeWalker.nextNode()) {
        if(currentNode.className == "module-description" && moduleDescription) {
            currentNode.textContent = moduleDescription;
            break;
        } 
     }

    let newNode = document.createElement("div");
    newNode.className = "friendly-usos-list-elem"

    while (node.childNodes.length > 0) {
        newNode.appendChild(node.childNodes[0]);
        newNode.style.margin = "20px"
    }

    divs.list.push(newNode)
}

function parseDocument() {
    let site = document.getElementById('layout-main-content')

    let treeWalker = document.createTreeWalker(
        site,
        NodeFilter.SHOW_ELEMENT,
        { acceptNode: () => NodeFilter.FILTER_ACCEPT },
        false
    );

    // Find all nodes to change
    let changes = { list: [] }; // Array inside an object to pass by reference

    let currentNode = treeWalker.nextNode();
    let lastNode;
    let moduleDescription = false
    let divs = { list: [] }

    while (currentNode) {

        if(currentNode.className == "obr") {
            changes.list.push([currentNode, deleteNode]);
        }

        if(currentNode.className == "tekst") {
            changes.list.push([currentNode, x => addToDivs(x, divs)])
        }

        lastNode = currentNode;
        currentNode = treeWalker.nextNode();
    }

    changes.list.forEach(change => {
        change[1](change[0])
    });

    deleteNode(document.getElementsByClassName('wrtext')[0])

    site = document.getElementById('layout-c22a')
    divs.list.forEach(div => {
        text = div.childNodes[0]
        console.log(div, text)

        site.appendChild(div)
    });
}

(function() {

    side = document.getElementById('layout-c21')
    side.parentNode.removeChild(side)

    parseDocument()

})();

