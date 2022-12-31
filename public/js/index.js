import Message from "./components/message.js"

import fullLink from "./components/full-link.js";
import star from "./components/star.js";
import loader from "./components/loader.js"

const init = function() {
    star();
    fullLink();
}

window.onload = async function() {
    try {
       await Message.refreshMessages();
    } catch(err) {
        console.error(err);
    }
    init();
    window.loader = loader;
}