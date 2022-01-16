(function() {
    
    menus = document.getElementsByClassName('menu')

    //Remove top menu entties
    main = menus[0]
    main.removeChild(main.children[1])
    main.removeChild(main.children[3])
    main.removeChild(main.children[3])

    //Remove side menu entties
    side = menus[1]
    side.removeChild(side.children[7])
    side.removeChild(side.children[6])
    side.removeChild(side.children[5])

    left_panel = document.querySelector("#layout-c22a > div > div.local-home-table > div > div:nth-child(1)");
    left_panel.removeChild(left_panel.children[0])

    main_panels = document.querySelector("#layout-c22a > div > div.local-home-table > div")
    main_panels.removeChild(main_panels.children[2])
})();
