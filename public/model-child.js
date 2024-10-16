const modelContainer = document.getElementById("model-content");

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getCarId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

window.onload = async function () {
    const carId = getCarId();

    try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) throw new Error('Failed to fetch car data');

        const car = await response.json();

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
        <div class="model-items-wrapper">
            <div class="model-items-container" style="display: block;">
                <h4 style="font-size: 36px; font-weight: 300;">${car.brand}</h4>
                <h1 style="font-size: 86px;">${car.model}</h1>
                <div class="model-items-sub" style="margin-top: 50px;">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Price</p>
                        <h4 class="model-price">${car.price}</h4>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Max Speed</p>
                        <h4 class="model-speed">${car.max_speed}</h4>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Power</p>
                        <h4 class="model-power">${car.power}</h4>
                    </div>
                </div>
            </div>
            <img src="${car.image}" class="model-image" />
        </div>
        
        <div class="model-child-content">
            <div class="model-child-image">
                <img src="${car.image_overview}" class="model-child-image" width="100"/>
            </div>
            
            <div class="model-child-text">
                <h1>OVERVIEW</h1>
                <p>${car.overview}</p>
            </div>
        </div>

        <div class="model-child-content">
            <div class="model-child-engine">
                <h1>ENGINE</h1>
                <p>${car.engine}</p>
            </div>
            <div class="model-child-engine-img">
                <img src="${car.image_engine}" class="model-child-image" width="100"/>
            </div>
        </div>

        <div class="model-child-layout">
            <div class="model-child-layout-image">
                <img src="${car.image_interior}" />
            </div>
            <div class="model-child-layout-image" style="position: absolute; right: 0;">
                <img src="${car.image_exterior}" />
            </div>
        </div>

        <div class="model-child-desc">
            <div>
                <h1>INTERIOR</h1>
                <p>${car.interior}</p>
            </div>
            <div>
                <h1>EXTERIOR</h1>
                <p>${car.exterior}</p>
            </div>
        </div>

        <h1 style="text-align: center; margin-bottom: 40px;">SPECIFICATIONS</h1>

        <div class="model-table-container">
            <table class="model-table">
                <tr>
                    <td><h4>MAX POWER</h4></td>
                    <td style="text-align: end;"><p>${car.power}</p></td>
                </tr>
                <tr>
                    <td><h4>TOP SPEED</h4></td>
                    <td style="text-align: end;"><p>${car.max_speed}</p></td>
                </tr>
                <tr>
                    <td><h4>ACCELERATION</h4></td>
                    <td style="text-align: end;"><p>${car.acceleration}</p></td>
                </tr>
                <tr>
                    <td><h4>POWER CONSUMPTION</h4></td>
                    <td style="text-align: end;"><p>${car.power_consumption}</p></td>
                </tr>
                <tr>
                    <td><h4>PRICE</h4></td>
                    <td style="text-align: end;"><p>${car.price}</p></td>
                </tr>
            </table>
        </div>

        <button id="checkout-button">Checkout</button>  
    `;

        modelContainer.appendChild(contentDiv);

        document.getElementById("checkout-button").addEventListener("click", () => {
            window.location.href = `/checkout/${car._id}`
        })
    } catch (error) {
        console.log(error)
    }

}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});





