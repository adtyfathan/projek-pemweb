const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

const userId = localStorage.getItem("id");
const image = document.querySelector(".model-image");
const modelBrand = document.querySelector(".model-brand");
const modelName = document.querySelector(".model-name");
const modelPrice = document.querySelector(".model-price");
const modelSpeed = document.querySelector(".model-speed");
const modelPower = document.querySelector(".model-power");
const modelContainer = document.querySelector(".model-content");
const modelButton = document.getElementById("x");
const likeImg = document.getElementById("like-image");
const likeCount = document.getElementById("like-count");

const likeUrl = "/images/like.png";
const likeFilledUrl = "/images/like_filled.png";
const column = "liked_cars";

let isLiked = false;
let currentData = null;
let likedCars = []; 

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const carResponse = await fetch("/api/cars");
        if (!carResponse.ok) throw new Error("Failed to fetch cars");
        const cars = await carResponse.json();

        const userResponse = await fetch(`/api/user/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user");
        const userData = await userResponse.json();

        likedCars = userData.liked_cars; 

        if (cars.length > 0) {
            currentData = cars[0]; 
            changeDisplay(currentData);

            cars.forEach((item) => {
                const contentDiv = document.createElement("div");
                contentDiv.classList.add("model-content-items");
                contentDiv.innerHTML = `<h1>${item.model}</h1>`;

                contentDiv.addEventListener("mouseover", () => {
                    currentData = item;
                    changeDisplay(item);
                    contentDiv.classList.add("model-active");
                });

                contentDiv.addEventListener("mouseout", () => {
                    contentDiv.classList.remove("model-active");
                });

                modelContainer.appendChild(contentDiv);
            });
        } else {
            console.error("No cars found");
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

modelButton.addEventListener("click", () => {
    if (currentData) {
        window.location.href = `/cars/${currentData._id}`;
    }
});

likeImg.addEventListener("click", async () => {
    if (!currentData) return;

    const instanceId = currentData._id;
    const route = (isLiked === true) ? "/api/user/remove-liked" : "/api/user/add-liked";

    try {
        const responseLike = await fetch(route, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, instanceId, column }),
        });

        if (responseLike.ok) {
            if (isLiked) {
                likedCars = likedCars.filter((id) => id !== instanceId);
            } else {
                likedCars.push(instanceId);
            }
            changeDisplay(currentData); 
        } else {
            throw new Error("Failed to update like status");
        }
    } catch (error) {
        console.error("Error updating like status:", error);
    }
});

function changeDisplay(item) {
    isLiked = likedCars.includes(item._id);
    likeImg.src = isLiked ? likeFilledUrl : likeUrl;

    image.setAttribute("src", item.image);
    modelBrand.textContent = item.brand;
    modelName.textContent = item.model;
    modelPrice.textContent = item.price;
    modelSpeed.textContent = item.max_speed;
    modelPower.textContent = item.power;
    likeCount.textContent = item.like;
}
