(function(dom, dnd) {
    "use strict";

    // elements
    var pinboard   = document.getElementById("pinboard")
        ,btnCreate = document.getElementById("btn-create");

    btnCreate.addEventListener("click", function() {

        // elements
        var container = document.createElement("section")
            ,header   = document.createElement("header")
            ,toolbar  = document.createElement("div")
            ,content  = document.createElement("div")
            ,btnClose = document.createElement("button");
            
        var onCloseClick = function() {
            header.removeEventListener("mousedown", dnd.start);
            header.removeEventListener("mouseup", dnd.stop);
            btnClose.removeEventListener("click", onCloseClick);
            content.removeEventListener("focus", onContentFocus);
            container.parentNode.removeChild(container);
        };
        
        var onContentFocus = function() {
            dom.toFront(container);
        };

        header.setAttribute("class", "header");

        content.setAttribute("class", "content");
        content.setAttribute("contenteditable", "true");
        content.addEventListener("focus", onContentFocus);

        container.setAttribute("class", "note");
        container.style.top  = "50px";
        container.style.left = "100px";
        container.appendChild(header);
        container.appendChild(content);

        btnClose.setAttribute("class", "btn-close");
        btnClose.setAttribute("title", "close");
        btnClose.innerHTML = "x";

        toolbar.setAttribute("class", "toolbar");
        toolbar.appendChild(btnClose);

        header.appendChild(toolbar);
        pinboard.appendChild(container);

        header.addEventListener("mousedown", function(e) {dnd.start(e, container);});
        header.addEventListener("mouseup", dnd.stop);
        btnClose.addEventListener("click", onCloseClick);

        dom.toFront(container);
    })

})(pinboard_dom_util, pinboard_dnd);
