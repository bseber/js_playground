(function() {
    "use strict";

    var pinboard   = document.getElementById("pinboard")
        ,btnCreate = document.getElementById("btn-create");

    function createNote(event) {

        // elements
        var container = document.createElement("section")
            ,header   = document.createElement("header")
            ,toolbar  = document.createElement("div")
            ,content  = document.createElement("div")
            ,btnClose = document.createElement("button");

        // events
        var mousePressed = false,
            prevMousePos,
            onMouseDown,
            onMouseUp,
            onMouseMove;

        header.setAttribute("class", "header");

        content.setAttribute("class", "content");
        content.setAttribute("contenteditable", "true");

        container.setAttribute("class", "note");
        container.style.top  = "50px";
        container.style.left = "100px";
        container.appendChild(header);
        container.appendChild(content);

        btnClose.setAttribute("class", "btn-close");
        btnClose.innerHTML = "x";

        toolbar.setAttribute("class", "toolbar");
        toolbar.appendChild(btnClose);

        header.appendChild(toolbar);
        pinboard.appendChild(container);

        onMouseDown = function(e) {
            e.preventDefault();
            e.stopPropagation();

            mousePressed = true;
            prevMousePos = {left: e.clientX, top: e.clientY};

            var curBodyClass = document.body.getAttribute("class");
            document.body.setAttribute("class", curBodyClass ? curBodyClass + " dragging-mode" : "dragging-mode");
            document.body.addEventListener("mousemove", onMouseMove);
        };

        onMouseUp = function(e) {
            e.preventDefault();
            e.stopPropagation();

            mousePressed = false;

            document.body.setAttribute("class", document.body.getAttribute("class").replace("dragging-mode", ""));
            document.body.removeEventListener("mousemove", onMouseMove);
        };

        onMouseMove = function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (!mousePressed) {
                return false;
            }

            var curMousePos = {left: e.clientX, top: e.clientY}
                ,deltaTop   = curMousePos.top - prevMousePos.top
                ,deltaLeft  = curMousePos.left - prevMousePos.left;

            container.style.top  = (parseInt(container.style.top, 10) + deltaTop) + "px";
            container.style.left = (parseInt(container.style.left, 10) + deltaLeft) + "px";

            prevMousePos = curMousePos;
        }

        header.addEventListener("mousedown", onMouseDown);
        header.addEventListener("mouseup", onMouseUp);
    }

    btnCreate.addEventListener("click", createNote)

})();
