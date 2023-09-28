import { form } from "./base/form.js";

export function modal(id) {
    
    return {
        id,
        form,
        open: false,
        show(){
            const $self = $(this.id);
            if (this.open) return;
            this.open = true;
            $self.addClass("show");
            document.body.dispatchEvent(
                new CustomEvent("onModalOpen", {
                    detail: {modal: this}
                })
            )

        },
        getTrigger() {
            return $(`[data-trigger-modal="${this.id}"]`)
        }
    }
}

