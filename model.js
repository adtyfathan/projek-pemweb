import { data } from "./datas.js";

const modelContainer = document.querySelector(".model-content");
const modelBrand = document.querySelector(".model-brand");
const modelName = document.querySelector(".model-name");
const modelPrice = document.querySelector(".model-price");
const modelSpeed = document.querySelector(".model-speed");
const modelPower = document.querySelector(".model-power");
const modelButton = document.getElementById("x");
const image = document.querySelector(".model-image");
let currentData = data[0];

modelButton.addEventListener("click", () => {
    var queryString = new URLSearchParams(currentData).toString();
    window.location.href = `./model-child.html?${queryString}`;
    console.log(queryString);
});

data.forEach(item => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("model-content-items");
    contentDiv.innerHTML = `
        <h1>${item.model}</h1>
    `;
    contentDiv.addEventListener("mouseover", () => {
        changeDisplay(item);
        contentDiv.classList.add("model-active");
        currentData = item;
        console.log(currentData)
    })
    contentDiv.addEventListener("mouseout", () => {
        contentDiv.classList.remove("model-active");
    })
    modelContainer.appendChild(contentDiv);
})

function changeDisplay(item) {
    image.setAttribute("src", item.image);
    modelBrand.textContent = item.brand;
    modelName.textContent = item.model;
    modelPrice.textContent = item.price;
    modelSpeed.textContent = item.max_speed;
    modelPower.textContent = item.power;
}