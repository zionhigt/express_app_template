export default function() {
    $("a.full-link").on("mouseover", function(event) {
        $(this).parent().addClass("hovered");
    });
    $("a.full-link").on("mouseout", function(event) {
        $(this).parent().removeClass("hovered");
    });
}