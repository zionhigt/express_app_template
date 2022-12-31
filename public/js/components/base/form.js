import api from "./api.js";

export default {
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