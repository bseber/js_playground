(function() {
    "use strict";

    var list  = $("#list"),
        items = list.children("li"),
        len   = items.length;
        
    var uls   = [$("<ul>")],
        i     = 0,
        j     = 0,
        ul;
    
    var getLvl = function(item) {
        return $($(item).find("input[name=level]").get(0)).val();
    };
    
    // set a breakpoint at "ul.append($(item))"
    // and see how the tree will be built
    $("body").append(uls[0]);
    
    // |0|       |0| | | |
    // |1|       | |1| | |
    // |2|  -->  | | |2| |
    // |3|       | | | |3|
    // |2|       | | |2| |
    // |1|       | |1| | |
    for(i = 0; i < len; i++) {
        j = getLvl(items[i]);
        ul = uls[j];
        if (!ul) {
            ul = uls[j] = $("<ul>");
            if (j > 0) {
                $("li:last-child", uls[j-1]).append(ul);
            }
        }
        ul.append($(items[i]));
    }
    
})();
