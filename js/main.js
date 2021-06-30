// model
var model = "";

const messages = {
  thank_contancting: "Gracias por contactar<br> con nosotros.",
  asoc_lead_eventconc_exist:
    "<strong>¡Felicidades!</strong><br>Ya estás registrado en el evento, en breve te llamaremos.",
  asoc_lead_eventconc_exist_ta:
    "<strong>Ya estás registrado en la oferta</strong>, en breve te llamaremos.",
  asoc_lead_error:
    "Ocurrió un error al intentar inscribirte al evento. Por favor, cierra la ventana, entra de nuevo a la pagina e intenta inscribirte de nuevo en el evento o contacta con nosotros por teléfono.",
  suspicious_behavior_error:
    "Disculpa, hemos detectado un comportamiento sospechoso y no hemos podido apuntarte en el evento. Por favor, cierra la ventana, entra de nuevo a la pagina e intenta inscribirte de nuevo o contacta con nosotros por teléfono.",
};

const loading = (_loading, _msg, frm) => {
  var button, spin, msg;

  if (frm == "main") {
    button = document.getElementById("btn-submit-main");
    spin = document.getElementById("loading-main");
    msg = document.getElementById("error-msg-main");
  } else if ((frm = "model")) {
    button = document.getElementById("btn-submit-model");
    spin = document.getElementById("loading-model");
    msg = document.getElementById("error-msg-model");
  }

  if (_loading) {
    spin.style.display = "block";
    msg.style.display = "none";
    button.disabled = true;
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
  } else {
    spin.style.display = "none";
    msg.style.display = "block";
    if (_msg != "") msg.innerHTML = messages[_msg];
    else {
      spin.style.display = "none";
      msg.style.display = "none";
    }
    button.disabled = false;
    button.classList.remove("btn-secondary");
    button.classList.add("btn-primary");
  }
};

// set the model
function setModel(_model) {
  loading(false, "", "model");
  model = _model;
  // console.log(model);
  var staticBackdropLabel = document.getElementById("staticBackdropLabel");
  // console.log(staticBackdropLabel);
  staticBackdropLabel.innerHTML =
    "Pedir Oferta " + "<strong>" + model + "</strong>";
}

// count down
(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let targetDate = "Jul 10, 2021 20:00:00",
    countDown = new Date(targetDate).getTime(),
    x = setInterval(function () {
      let now = new Date().getTime(),
        distance = countDown - now;

      (document.getElementById("days").innerText = Math.floor(distance / day)),
        (document.getElementById("hours").innerText = Math.floor(
          (distance % day) / hour
        )),
        (document.getElementById("minutes").innerText = Math.floor(
          (distance % hour) / minute
        )),
        (document.getElementById("seconds").innerText = Math.floor(
          (distance % minute) / second
        ));

      //do something later when date is reached
      if (distance < 0) {
        (document.getElementById("days").innerText = 00),
          (document.getElementById("hours").innerText = 00),
          (document.getElementById("minutes").innerText = 00),
          (document.getElementById("seconds").innerText = 00);

        clearInterval(x);
      }
      //seconds
    }, 0);
})();

// smoth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// submit data-form to api
function _onSubmit(data, frm) {
  // console.log(data);

  gtag("event", "conversion", { send_to: "AW-815301901/mgeFCNO4v7kBEI2K4oQD" });
  //Insert lead
  var action = "Apuntame_OK";
  var actionError = "Apuntame_error";
  data.token = "";
  data.action = action;

  // console.log(data);

  // Send lead data to API
  // $.ajax({
  //     url: 'https://app.liddeo.com/api/landings/register',
  //     method: "POST",
  //     data: data,
  //     success: function (response) {
  //         dataLayer.push({ 'event': action });
  //     },
  //     error: function (response) {
  //         dataLayer.push({ 'event': actionError });
  //         return false;
  //     }
  // });
  loading(true, "", frm);
  axios
    .post("https://app.liddeo.com/api/landings/register", data)
    .then((res) => {
      loading(false, res.data.message, frm);
      // console.log(res.data.message);
      dataLayer.push({ 'event': action });
    })
    .catch((err) => {
      loading(false, err.response.data.message, frm);
      // console.log(err.response.data.message);
      dataLayer.push({ 'event': actionError });
    });
}

// on submit main-form
$("#main-frm").submit(function (e) {
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
    phone: phone,
    event: event,
    prefix: prefix,
    postalCode: postalCode,
  };

  _onSubmit(data, "main");
});

// on submit model-form
$("#model-frm").submit(function (e) {
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
  // var name = form.querySelector("input[name='name']").value;

  var data = {
    // "model": model,
    // "name": name,
    phone: phone,
    event: event,
    prefix: prefix,
    postalCode: postalCode,
  };

  _onSubmit(data, "model");
});
