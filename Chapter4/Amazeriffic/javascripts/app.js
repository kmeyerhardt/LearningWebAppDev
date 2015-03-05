var main = function () {
    var toDos = ["Get groceries",
                 "Make up some new ToDos",
                 "Prep for Monday's class",
                 "Answer emails",
                 "Take Gracie to the park",
                 "Finish writing this book"];
    
    var images = ["<li><p><a class=\"slides\"  href=\"sc1.png\" title=\"Screenshot 1\">Screenshot 1</a></p></li>",
                  "<li><p><a class=\"slides\"  href=\"sc2.png\" title=\"Screenshot 2\">Screenshot 2</a></p></li>",
                  "<li><p><a class=\"slides\"  href=\"sc3.png\" title=\"Screenshot 3\">Screenshot 3</a></p></li>",
                  "<li><p><a class=\"slides\"  href=\"sc4.png\" title=\"Screenshot 4\">Screenshot 4</a></p></li>"];
    
    

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                // input a new to-do
                $input = $("<input>"),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        $input.val("");
                    }
                });

                $content = $("<div>").append($input).append($button);
               /* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */
            }else if ($element.parent().is(":nth-child(4)")) {
                $content = $("<ul>");
                images.forEach(function (image) {
                    $content.append($(image));
                });
                $content.append("</ul>");
                $content.append("<script>window.onload=$(\".slides\").colorbox({rel:'slides', slideshow:true});</script>");
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);
