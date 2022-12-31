export default function() {
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