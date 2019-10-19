var windowWidth = window.screen.width
    setViewPort(windowWidth);
    function setViewPort(w_width) {
        if (w_width <= 420 ){
            $("meta[name=viewport]").attr("content", "width=420, maximum-scale=2.0, user-scalable=yes, target-densitydpi=medium-dpi");
        } else {
            $("meta[name=viewport]").attr("content", "width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, user-scalable=yes, target-densitydpi=medium-dpi");
        }
    }