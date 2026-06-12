$(document).ready(function () {
    $('.fa-bars').click(function () {
        $(this).toggleClass('fa-xmark');
        $('.navbar').toggleClass('nav-toggle')
    });

    $(window).on('scroll load', function () {
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 30) {
            $('header').addClass('header-active');
        } else {
            $('header').removeClass('header-active');
        }
    })

});

console.log("SCRIPT LOADED")
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("appointmentForm");

    emailjs.init("pnZsjuTr3E-902gwJ");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
     console.log('FORM SUBMIT FIRED');
        alert("FORM WORKING");

        let date = document.getElementById("date").value;
        let today = new Date().toISOString().split("T")[0];

        if (date < today) {
            alert("Please select a future date");
            return;
        }

        emailjs.sendForm(
            "service_mxgkplv",
            "template_actzdil",
            this
        )
        .then(() => {
            alert("Appointment Booked Successfully!");
            form.reset();
        })
        .catch((err) => {
            console.log(err);
            alert("Failed to send!");
        });

    });

});