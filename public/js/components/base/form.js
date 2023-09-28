import api from "./api.js";

export const form = {
    api,
    getBody: function(form) {
        const formData = new FormData(form);
        const bodyVerify = [];
        const body = {};
        
        for(let field of formData.entries()) {
            let v = typeof field[1] === 'string' ? field[1] : '';
            let k = field[0]
            body[field[0]] = v;
            if(v === '') bodyVerify.push(k);
        }
        
        return (bodyVerify.length === 0) ? body : `${bodyVerify.join(", ")} ${bodyVerify.length > 1 ? "sont" : "est"} requis !`;
    },
    submit: async function(form) {
        const body = this.getBody(form);
    
        if(typeof body === 'string') return alert(body);
    
        const options = {
            method: form.getAttribute("method"),
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }
    
        const postUrl = form.getAttribute("action");
        return this.api.send(new Request(postUrl, options));
    }

}
$("#formContact").on("submit", async function(event) {
    event.preventDefault();
    function submitForm(_form) {
        const confirmPublish = confirm("En publiant ce message vous acceptez de l'exposer à la vue de tous les visiteurs de ce site !");
        if(!confirmPublish) return Promise.reject(new Error("Annulé par l'utilisateur"));
        return form.submit(_form);
    }
    try {
        const messages = await submitForm(event.currentTarget);
        if(!!messages) {
            //await message.refreshMessages()
            document.dispatchEvent(
                new CustomEvent("message@trigger_refresh")
            )
            return 0;
        }
    } catch (err) {
        console.error(err);
        return 1;
    }
});