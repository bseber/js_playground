var pinboard_dom_util = (function() {
    "use strict";

    var dom = {};
    
    dom.addClass = function(element, className) {
        var classNames = element.getAttribute("class");
        classNames = classNames ? classNames.split(" ") : [];
        classNames[classNames.length] = className;
        element.setAttribute("class", classNames.join(" "));
    };
    
    dom.removeClass = function(element, className) {
        var classNames = element.getAttribute("class");
        if (classNames) {
            var newClassNames = [];
            classNames.split(" ").forEach(function(c) {
                if (c !== className) {
                    newClassNames.push(c);
                }
            });
            element.setAttribute("class", newClassNames.join(" "));
        }
    };

    dom.toFront = (function() {
        var z = 10;
        return function(element) {
            z++;
            element.style["z-index"] = z;
        };
    })();
    
    return dom;

})();
