import { message as Message } from "./components/message.js"

import fullLink from "./components/full-link.js";
import star from "./components/star.js";
import loader from "./components/loader.js"
import { modal } from "./components/modal.js"

const init = function() {
    star();
    fullLink();
}

window.onload = async function() {
    try {
       await Message.refreshMessages();
    } catch(err) {
        console.error(err);
        throw err;
    }
    init();
    window.loader = loader;
    const mod = modal("#contactModal");
    const trigger = mod.getTrigger();
    trigger.on("click", event => {
        mod.show();
    })
    $("body").on("onModalOpen", function(event) {
        const modal = event.detail.modal;
        if (modal.open) {
            $(this).addClass("modal-open");
        }
    })


}