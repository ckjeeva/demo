// LOGIN
function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    emailError.innerText = "";
    passwordError.innerText = "";

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!emailPattern.test(email)) {
        emailError.innerText = "Enter valid email";
        return;
    }

    if (!passwordPattern.test(password)) {
        passwordError.innerText = "Password must contain 1 uppercase & 1 number";
        return;
    }

    window.location.href = "home.html";
}


// PRICE CALCULATION
function calculatePrice() {
    let price = document.getElementById("type").value;
    document.getElementById("price").innerText = price;
}


// GO TO PAYMENT
function goToPayment() {

    let typeText = document.getElementById("type").options[
        document.getElementById("type").selectedIndex
    ].text;

    let size = document.getElementById("size").value;
    let req = document.getElementById("req").value;
    let price = document.getElementById("price").innerText;

    sessionStorage.setItem("type", typeText);
    sessionStorage.setItem("size", size);
    sessionStorage.setItem("req", req);
    sessionStorage.setItem("price", price);

    window.location.href = "payment.html";
}


// LOAD PAYMENT DATA SAFELY
if (window.location.pathname.includes("payment.html")) {

    let type = sessionStorage.getItem("type");
    let size = sessionStorage.getItem("size");
    let req = sessionStorage.getItem("req");
    let price = sessionStorage.getItem("price");

    if (type && price) {

        document.getElementById("summary").innerHTML =
            `<b>Type:</b> ${type}<br>
             <b>Size:</b> ${size}<br>
             <b>Requirement:</b> ${req}`;

        document.getElementById("finalPrice").innerText = price;
    }
}


// WHATSAPP CONFIRM
function sendWhatsApp() {

    let type = sessionStorage.getItem("type");
    let size = sessionStorage.getItem("size");
    let req = sessionStorage.getItem("req");

    let message = `Hello Jeevan, I have completed payment.
Type: ${type}
Size: ${size}
Requirement: ${req}`;

    let phone = "919591638515";

    let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}
