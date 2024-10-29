const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getCarId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

const modelContainer = document.getElementById("checkout-data");

window.onload = async function () {
    const carId = getCarId();

    try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) throw new Error('Failed to fetch car data');

        const car = await response.json();
        console.log(car);

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
            <img src="${car.image}" width=200/>
            <h1>${car.brand}</h1>
            <p>${car.model}</p>
            <p>${car.price}</p>
        `;
        
        modelContainer.appendChild(contentDiv);

    } catch (error) {
        console.log(error)
    }
}