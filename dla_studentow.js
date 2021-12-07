(function() {

	// just place a div at top right
    for(j=0; j < 4; j++) {
        icons = document.getElementsByClassName('obr')
        for (i = 0; i < icons.length; i++) {
            icons[i].parentElement.removeChild(icons[i])
        }

    }

    // site = document.getElementById('layout-c22a')
    // var d = document.createElement("div")
    // site.appendChild(d)
    // d.id = "tooltiptext"
    // d.innerHTML = "elo"
    // d.style.position = "relative"
    // d.style.display = "inline-block"
    // d.style.visibility = "hidden"

    texts = document.getElementsByClassName('tekst')
    for (i = 0; i < texts.length; i++) {
        texts[i].style['padding'] = "20px"
        texts[i].style['vertical-align'] = 'top'
        texts[i].getElementsByTagName('a')[0].style['font-size'] = '20px'
        texts[i].getElementsByTagName('a')[0].style['color'] = '#3C6F6F'
        texts[i].getElementsByClassName('module-description')[0].style['color'] = '#6f6f6f'
        // texts[i].parentElement.removeChild(texts[i]
    }
    // document.addElem

    side = document.getElementById('layout-c21')
    side.parentNode.removeChild(side)

    m = document.getElementsByClassName('menu')
    menu = m[0]
    menu.removeChild(menu.children[1])
    menu.removeChild(menu.children[3])
    menu.removeChild(menu.children[3])

    re = document.getElementById('rejestracje_link')
    re.title = "To jest przykładowy tooltip opisujący wszystko co się da. Tooltipy mogą być bardzo przydatne."

    re.style["font-size"] = "20px"
    re.innerHTML="Rejestracja na przedmioty"






//     icons = document.getElementsByClassName('obr')
//     for

//   side = document.getElementById('mw-panel')
//   side.parentElement.removeChild(side)

//   content = document.getElementById('content')

//   content.style.marginLeft = '0%'


})();

