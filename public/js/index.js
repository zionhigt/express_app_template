const refreshMessages = async function(){
    const paragrapheMessages = $(".messages__paragraphe .content")
    let visitorMessages = await getMessages();
    paragrapheMessages.empty();
    if (visitorMessages.length > 0) {
        $("#messages").removeClass("d-none");
        visitorMessages.forEach(function(item) {
            paragrapheMessages.append(buildMessage(item))
        });
    } else {
        $("#messages").addClass("d-none");
    }
}
const getMessages = async function() {
    // const request = await fetch("http://preprod.seb-dev.tech/reponse.php?all=1");
    const request = await fetch("/messages");
    return await request.json();
    
}
const buildMessage = function(item) {
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
}

const sendMessage = async function(url, options) {
    const post = await fetch(url, options);
    if(post.status === 201) return await post.json();
}

const getBody = function(form) {
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
}

const submitForm = async function(form) {
    const body = getBody(form);

    if(typeof body === 'string') return alert(body);

    const options = {
        method: form.getAttribute("method"),
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }

    const confirmPublish = confirm("En publiant ce message vous acceptez de l'exposer à la vue de tous les visiteurs de ce site !");
    if(!confirmPublish) return Promise.reject(new Error("Annulé par l'utilisateur"));

    const postUrl = form.getAttribute("action");
    return sendMessage(postUrl, options);
}

const initEvent = function() {
    $("#formContact").on("submit", function(event) {
        event.preventDefault();
        return submitForm(event.currentTarget)
        .then(async function(messages) {
            if(!!messages) {
                await refreshMessages()
                return 0;
            }
        })
        .catch(function(err) {
            console.error(err);
            return 1;
        })
    });

    $("form .rate__stars").on("change", function(event) {
        const rateValue = $("input#rate");
        const $this = $(this);
        const rate = Number.parseInt($this.attr("id").replace("star", ""));
        const siblings = $this.parent().find('input[id^="star"]');
        console.log(rate, rateValue.val())
        if (rate < Number.parseInt(rateValue.val())) {
            siblings.each(function() {
                $(this).prop("checked", false)
            })
            $this.prop("checked", true);
        }
        if (siblings.length >= rate) {
            for (let i = 0; i < rate; i++) {
                const $element = $(siblings[i]);
                $element.prop("checked", $this.is(":checked"));
            }
        }
        rateValue.val(rate);
    })
    
}

const stopLoading = function() {
    $("body").removeClass("loading");
    $(".loader").addClass("d-none");
    $(".script").addClass("write");
}
window.onload = function() {
    refreshMessages().then(parent => {
        console.log(parent)
    });
    initEvent();
    setTimeout(stopLoading, 1500);

    $("a.full-link").on("mouseover", function(event) {
        $(this).parent().addClass("hovered");
    });
    $("a.full-link").on("mouseout", function(event) {
        $(this).parent().removeClass("hovered");
    });

}