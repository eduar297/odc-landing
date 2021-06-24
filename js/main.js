// model
var model = "";

// set the model
function setModel(_model) {
    model = _model
    // console.log(model);
    var staticBackdropLabel = document.getElementById('staticBackdropLabel');
    // console.log(staticBackdropLabel);
    staticBackdropLabel.innerHTML = "Pedir Oferta " + "<strong>" + model + "</strong>";
}

// count down
(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let targetDate = "Sep 30, 2021 00:00:00",
        countDown = new Date(targetDate).getTime(),
        x = setInterval(function () {

            let now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            //do something later when date is reached
            if (distance < 0) {
                document.getElementById("days").innerText = 00,
                    document.getElementById("hours").innerText = 00,
                    document.getElementById("minutes").innerText = 00,
                    document.getElementById("seconds").innerText = 00;

                clearInterval(x);
            }
            //seconds
        }, 0)
}());

// smoth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// submit data-form to api
function _onSubmit(data) {
    // console.log(data);

    gtag('event', 'conversion', { 'send_to': 'AW-815301901/mgeFCNO4v7kBEI2K4oQD' });
    //Insert lead
    var action = 'Apuntame_OK';
    var actionError = 'Apuntame_error';
    data.token = '';
    data.action = action;

    // Send lead data to API
    $.ajax({
        url: 'https://app.liddeo.com/api/landings/register',
        method: "POST",
        data: data,
        success: function (response) {
            dataLayer.push({ 'event': action });
        },
        error: function (response) {
            dataLayer.push({ 'event': actionError });
            return false;
        }
    });
}

// on submit main-form
$("#main-form").submit(function (e) {
    e.preventDefault();
    var form = e.target;

    //Capture value from phone input
    var input = form.querySelector("input[name='phone']");
    var phone = input.value;
    var prefix = "+34" + input.value;
    //event: Search for the corresponding id_event
    var event = 804;
    var postalCode = form.querySelector("input[name='pc']").value;

    var data = {
        "phone": phone,
        "event": event,
        "prefix": prefix,
        "postalCode": postalCode
    };

    _onSubmit(data);
})

// on submit model-form
$("#form-model").submit(function (e) {
    e.preventDefault();
    var form = e.target;

    //Capture value from phone input
    var input = form.querySelector("input[name='phone']");
    var phone = input.value;
    var prefix = "+34" + input.value;
    //event: Search for the corresponding id_event
    var event = 804;
    var postalCode = form.querySelector("input[name='pc']").value;
    //Capture value from phone input
    var name = form.querySelector("input[name='name']").value;

    var data = {
        "model": model,
        "name": name,
        "phone": phone,
        "event": event,
        "prefix": prefix,
        "postalCode": postalCode
    };

    _onSubmit(data);
})