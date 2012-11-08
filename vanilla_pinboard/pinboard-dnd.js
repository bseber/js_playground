var pinboard_dnd = (function(dom) {
    "use strict";

    var _mousePressed = false
        ,_prevMousePos
        ,_element;

    function start(event, element) {
        event.preventDefault();
        event.stopPropagation();

        document.activeElement.blur();

        _element = element;
        _mousePressed = true;
        _prevMousePos = {left: event.clientX, top: event.clientY};

        dom.addClass(_element, "dragging");
        dom.toFront(_element);

        dom.addClass(document.body, "dragging-mode");
        document.body.addEventListener("mousemove", move);
    }

    function stop(e) {
        e.preventDefault();
        e.stopPropagation();

        _mousePressed = false;

        dom.removeClass(_element, "dragging");
        dom.removeClass(document.body, "dragging-mode");

        document.body.removeEventListener("mousemove", move);
    }

    function move(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (_mousePressed) {
        
            var curMousePos = {left: e.clientX, top: e.clientY}
                ,deltaTop   = curMousePos.top - _prevMousePos.top
                ,deltaLeft  = curMousePos.left - _prevMousePos.left

            _element.style.top  = (parseInt(_element.style.top, 10) + deltaTop) + "px";
            _element.style.left = (parseInt(_element.style.left, 10) + deltaLeft) + "px";

            _prevMousePos = curMousePos;
        }

    }

    return {
        start: start
        ,stop: stop
    };

})(pinboard_dom_util);
