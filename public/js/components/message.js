import form from "./base/form.js";


export default (function() {
    const message = {
        form,
        refreshMessages: async function(){
            const paragrapheMessages = $(".messages__paragraphe .content")
            let visitorMessages = await this.getMessages();
            paragrapheMessages.empty();
            if (visitorMessages.length > 0) {
                $("#messages").removeClass("d-none");
                visitorMessages.forEach(function(item) {
                    paragrapheMessages.append(this.buildMessage(item));
                }.bind(this));
            } else {
                $("#messages").addClass("d-none");
            }
        },
        getMessages: async function() {
            const request = await fetch("/messages");
            return await request.json();
            
        },
        buildMessage: function(item) {
            if (item) {
                const clean_date = (new Date(item.writeAt));
                const $messageFigure = $("<figure>").append(
                    $("<figcaption>").append([
                        $("<div>")
                        .addClass("messages__header")
                        .append([
                            $("<h6>").text(item.name),
                            $("<small>").text(`${clean_date.toLocaleDateString()} à ${clean_date.toLocaleTimeString()}`)
                        ]),
                        $("<div>")
                        .addClass("messages__stars--" + item.rate)
                        .append([
                            $("<span>").html('<i class="fa-solid fa-star"></i>'),
                            $("<span>").html('<i class="fa-solid fa-star"></i>'),
                            $("<span>").html('<i class="fa-solid fa-star"></i>'),
                            $("<span>").html('<i class="fa-solid fa-star"></i>'),
                            $("<span>").html('<i class="fa-solid fa-star"></i>')
                        ].map(function(star, i) {
                            if(i <= item.rate - 1) {
                                star.addClass("active");
                            }
                            return star;
                        })),
                        $("<p>").text(item.message)
                    ])
                ).addClass("message")
                return $messageFigure;
        
                // if(item.name == "110690") {
                //     item.name = "Seb-dev";
                //     const figure = messageClone.find("figure");
                //     figure.addClass("bg-primary", "admin-message");
                //     figure.find(".message-header span").removeClass("text-primary").addClass("text-light")
                //     figure.removeClass("bg-light")
                //     figure.parent().addClass("justify-content-end");
                //     figure.parent().removeClass("justify-content-between");
        
                // };
            }
        },
        submitForm: function(form) {
            const confirmPublish = confirm("En publiant ce message vous acceptez de l'exposer à la vue de tous les visiteurs de ce site !");
            if(!confirmPublish) return Promise.reject(new Error("Annulé par l'utilisateur"));
            return this.form.submit(form);
        }
        
    }
    $("#formContact").on("submit", async function(event) {
        event.preventDefault();
        try {
            const messages = await message.submitForm(event.currentTarget);
            if(!!messages) {
                await message.refreshMessages()
                return 0;
            }
        } catch (err) {
            console.error(err);
            return 1;
        }
    });
    return message;
})()