const role = localStorage.getItem("role");
const transactionNav = document.getElementById("profile-transaction");
const manageNav = document.getElementById("profile-admin");
const contactNav = document.getElementById("profile-contact");

const adminWrapper = document.getElementById("admin-wrapper");

const url = new URL(window.location.href);
const carId = url.pathname.split('/').pop();

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

const fetchCarData = async (carId) => {
    try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) throw new Error("Failed to fetch car");
        return await response.json();
    } catch (error) {
        console.error("Error fetching car data:", error);
        throw error;
    }
};

const createCarForm = (car) => {
    const form = document.createElement("form");
    form.classList.add("form")
    form.innerHTML = `
        <div>
            <label>Brand</label>
            <input id="brand" type="text" value="${car.brand}" required placeholder="blah blah blah"/>

            <label>Model</label>
            <input id="model" type="text" value="${car.model}" required placeholder="blah blah blah"/>
        </div>
        <div>
            <label>Product Picture</label>
            <input id="main-img" type="text" value="${car.image}" required placeholder="/path"/>

            <label>Product Price</label>
            <input id="price" type="number" value="${car.price}" required placeholder="blah blah blah"/>
        </div>
        <div>
            <label>Max Speed (km/h)</label>
            <input id="speed" type="number" value="${car.max_speed}" required placeholder="blah blah blah"/>

            <label>Acceleration</label>
            <input id="acceleration" type="number" step="0.1" value="${car.acceleration}" required placeholder="blah blah blah"/>
        </div>
        <div>
            <label>Power</label>
            <input id="power" type="number" value="${car.power}" required placeholder="blah blah blah"/>

            <label>Power Consumption</label>
            <input id="power-consumption" type="text" value="${car.power_consumption}" required placeholder="blah blah blah"/>
        </div>
        <div>
            <label>Overview Picture</label>
            <input id="overview-img" type="text" value="${car.image_overview}" required placeholder="/path"/>

            <label>Overview Description</label>
            <textarea id="overview-desc" placeholder="blah blah blah">${car.description}</textarea>
        </div>
        <div>
            <label>Engine Picture</label>
            <input id="engine-img" type="text" value="${car.image_engine}" placeholder="/path"/>

            <label>Engine Description</label>
            <textarea id="engine-desc" placeholder="blah blah blah">${car.engine}</textarea>
        </div>
        <div>
            <label>Interior Picture</label>
            <input id="interior-img" type="text" value="${car.image_interior}" placeholder="/path"/>

            <label>Interior Description</label>
            <textarea id="interior-desc" placeholder="blah blah blah">${car.interior}</textarea>
        </div>
        <div>
            <label>Exterior Picture</label>
            <input id="exterior-img" type="text" value="${car.image_exterior}" placeholder="/path"/>

            <label>Exterior Description</label>
            <textarea id="exterior-desc" placeholder="blah blah blah">${car.exterior}</textarea>
        </div>

        <button type="submit">Update Car</button>
    `;
    return form;
};

const handleFormSubmit = async (event, carId) => {
    event.preventDefault();

    const carData = {
        carId,
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
        const response = await fetch("/api/cars/update-car", {
            method: "PUT", 
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
};

window.onload = async () => {
    manageNav.classList.add("profile-active");

    try {
        const car = await fetchCarData(carId);
        const form = createCarForm(car);

        adminWrapper.appendChild(form);

        form.addEventListener("submit", (event) => handleFormSubmit(event, carId));
    } catch (error) {
        console.error("Error initializing page:", error);
    }
};
