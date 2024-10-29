import { news } from "./datas.js";

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

const user = localStorage.getItem("user");

console.log(user)



let activeSlide = 2;

const redirectBtn0 = document.getElementById("home-button0");
const redirectBtn1 = document.getElementById("home-button1");
const redirectBtn2 = document.getElementById("home-button2");
const redirectBtn3 = document.getElementById("home-button3");

redirectBtn0.addEventListener("click", () => redirect(0));
redirectBtn1.addEventListener("click", () => redirect(1));
redirectBtn2.addEventListener("click", () => redirect(2));
redirectBtn3.addEventListener("click", () => redirect(3));

setSlideHeader();

document.getElementById("sub-slide").addEventListener("click", subtSlide);
document.getElementById("add-slide").addEventListener("click", addSlide);

function addSlide() {
    document.querySelectorAll("[data-index]")[activeSlide].classList.remove("active");
    activeSlide = (activeSlide + 1) % 3;
    document.querySelectorAll("[data-index]")[activeSlide].classList.add("active");
    setSlideHeader();
}

function subtSlide() {
    document.querySelectorAll("[data-index]")[activeSlide].classList.remove("active");
    activeSlide = (activeSlide + 2) % 3;
    document.querySelectorAll("[data-index]")[activeSlide].classList.add("active");
    setSlideHeader();
}

function setSlideHeader() {
    if (activeSlide == 0) {
        document.querySelector(".slide-header").innerHTML = "PORSCHE 911"
        document.querySelector(".slide-sub").innerHTML = "PORSCHE"
    } else if (activeSlide == 1) {
        document.querySelector(".slide-header").innerHTML = "F8 TRIBUTO"
        document.querySelector(".slide-sub").innerHTML = "FERRARI"
    } else if (activeSlide == 2) {
        document.querySelector(".slide-header").innerHTML = "REVUELTO"
        document.querySelector(".slide-sub").innerHTML = "LAMBORGHINI"
    }
}

function redirect(index) {
    var queryString = new URLSearchParams(news[index]).toString();
    window.location.href = `./news-child.html?${queryString}`;
    console.log(queryString);
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});
