{

    var delete_menu = [
        "KATALOG",
        "DLA PRACOWNIKÓW"
    ]

    function deleteMenuItem(menuItemText) {
        let cont = false
        delete_menu.forEach(elem => {
            if(menuItemText.includes(elem)) {
                cont = true
            }
        })
        
        return cont
    }

    m = document.getElementsByClassName('menu')
    menu = m[0]
    var index = 0
    while(menu.children[index]) {
        if(deleteMenuItem(menu.children[index].textContent)) {
            menu.removeChild(menu.children[index])
        } else {
            index += 1
        }
    }

}