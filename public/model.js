const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

let data;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/cars");
        if (!response.ok) throw new Error("Failed to fetch cars");
        data = await response.json();
        if (data.length > 0) {
            let currentData = data[0];

            const modelContainer = document.querySelector(".model-content");
            const modelButton = document.getElementById("x");

            data.forEach(item => {
                const contentDiv = document.createElement("div");
                contentDiv.classList.add("model-content-items");
                contentDiv.innerHTML = `<h1>${item.model}</h1>`;
                contentDiv.addEventListener("mouseover", () => {
                    changeDisplay(item);
                    contentDiv.classList.add("model-active");
                    currentData = item;
                })
                contentDiv.addEventListener("mouseout", () => {
                    contentDiv.classList.remove("model-active");
                })
                modelButton.addEventListener("click", () => {

                    window.location.href = `/cars/${currentData._id}`
                });
                modelContainer.appendChild(contentDiv);
            })
            changeDisplay(currentData)
        }
    } catch (error) {
        console.log(error);
    }
})

function changeDisplay(item) {
    const image = document.querySelector(".model-image");
    const modelBrand = document.querySelector(".model-brand");
    const modelName = document.querySelector(".model-name");
    const modelPrice = document.querySelector(".model-price");
    const modelSpeed = document.querySelector(".model-speed");
    const modelPower = document.querySelector(".model-power");

    image.setAttribute("src", item.image);
    modelBrand.textContent = item.brand;
    modelName.textContent = item.model;
    modelPrice.textContent = item.price;
    modelSpeed.textContent = item.max_speed;
    modelPower.textContent = item.power;
}