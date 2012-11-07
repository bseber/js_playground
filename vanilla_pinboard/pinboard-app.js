(function() {
    "use strict";

    var pinboard   = document.getElementById("pinboard")
        ,btnCreate = document.getElementById("btn-create")
        ,highestZ  = 42; // random number

    function addClass(el, className) {
        var classNames = el.getAttribute("class");
        classNames = classNames ? classNames.split(" ") : [];
        classNames[classNames.length] = className;
        el.setAttribute("class", classNames.join(" "));
    }

    function removeClass(el, className) {
        var classNames = el.getAttribute("class");
        if (classNames) {
            var newClassNames = [];
            classNames.split(" ").forEach(function(c) {
                if (c !== className) {
                    newClassNames.push(c);
                }
            });
            el.setAttribute("class", newClassNames.join(" "));
        }
    }

    function createNote(event) {

        // elements
        var container = document.createElement("section")
            ,header   = document.createElement("header")
            ,toolbar  = document.createElement("div")
            ,content  = document.createElement("div")
            ,btnClose = document.createElement("button");

        // events
        var mousePressed = false
            ,prevMousePos
            ,onMouseDown
            ,onMouseUp
            ,onMouseMove
            ,onCloseClick;

        header.setAttribute("class", "header");

        content.setAttribute("class", "content");
        content.setAttribute("contenteditable", "true");

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

        onMouseDown = function(e) {
            e.preventDefault();
            e.stopPropagation();

            mousePressed = true;
            prevMousePos = {left: e.clientX, top: e.clientY};

            addClass(container, "dragging");

            highestZ++;
            container.style["z-index"] = highestZ;

            addClass(document.body, "dragging-mode");

            document.body.addEventListener("mousemove", onMouseMove);
        };

        onMouseUp = function(e) {
            e.preventDefault();
            e.stopPropagation();

            mousePressed = false;

            removeClass(container, "dragging");
            removeClass(document.body, "dragging-mode");

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

        onCloseClick = function(e) {
            header.removeEventListener("mousedown", onMouseDown);
            header.removeEventListener("mouseup", onMouseUp);
            btnClose.removeEventListener("click", onCloseClick);
            container.parentNode.removeChild(container);
        };

        header.addEventListener("mousedown", onMouseDown);
        header.addEventListener("mouseup", onMouseUp);
        btnClose.addEventListener("click", onCloseClick);

        highestZ++;
        container.style["z-index"] = highestZ;
    }

    btnCreate.addEventListener("click", createNote)

})();
