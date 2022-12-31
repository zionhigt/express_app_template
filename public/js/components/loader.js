export default (function() {
    const loader = {
        stopLoading: function() {
            $("body").removeClass("loading");
            $(".loader").addClass("d-none");
            $(".script").addClass("write");
        },
        startLoading: function() {
            $("body").addClass("loading");
            $(".loader").removeClass("d-none");
            $(".script").removeClass("write");
        }
    }
    setTimeout(loader.stopLoading, 1500);
    return loader;
})()