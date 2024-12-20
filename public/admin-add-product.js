const role = localStorage.getItem("role");
const transactionNav = document.getElementById("profile-transaction");
const manageNav = document.getElementById("profile-admin");
const contactNav = document.getElementById("profile-contact");

const adminWrapper = document.getElementById("admin-wrapper");
const form = document.getElementById("form");

if (role !== "user") {
    transactionNav.style.display = "none";
    contactNav.style.display = "none";
    if (!role) {
        alert("You don't have the access!");
        window.location.href = "/login";
    }
} else {
    manageNav.style.display = "none";
}

window.onload = async () => {
    manageNav.classList.add("profile-active");
}

form.addEventListener("submit", async(event) => {
    event.preventDefault();

    const carData = {
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        power: parseInt(document.getElementById("power").value),
        max_speed: parseInt(document.getElementById("speed").value),
        acceleration: parseFloat(document.getElementById("acceleration").value),
        image: document.getElementById("main-img").value,
        image_overview: document.getElementById("overview-img").value,
        image_engine: document.getElementById("engine-img").value,
        image_interior: document.getElementById("interior-img").value,
        image_exterior: document.getElementById("exterior-img").value,
        description: document.getElementById("overview-desc").value,
        power_consumption: document.getElementById("power-consumption").value,
        price: document.getElementById("price").value,
        overview: document.getElementById("overview-desc").value,
        engine: document.getElementById("engine-desc").value,
        interior: document.getElementById("interior-desc").value,
        exterior: document.getElementById("exterior-desc").value,
    };

    try {
        const response = await fetch("/api/cars/insert-car", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update car");
        }

        alert("Car data updated successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error updating car:", error);
        alert("An error occurred while updating the car.");
    }
})