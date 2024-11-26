const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

let qty = 1;

function getCarId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

function toCurrency(integerValue){
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(integerValue);
    return formattedPrice;
}

const modelContainer = document.getElementById("checkout-data");

window.onload = async function () {
    const carId = getCarId();

    try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) throw new Error('Failed to fetch car data');

        const car = await response.json();
        console.log(car);

        const priceInt = Number(car.price.replace(/[\$,]/g, ""));
        let orderPrice = priceInt * qty;
        let deliveryPrice = orderPrice * 0.0005;
        let taxPrice = orderPrice * 0.1;
        let appPrice = priceInt * 0.001;
        let totalPrice = orderPrice + deliveryPrice + taxPrice + appPrice;

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
            <img src="${car.image}" width=200/>
            
            <p>${car.brand} ${car.model}</p>
            <p>${car.price}</p>

            <p>Order Summary</p>

            <hr/>

            <div>
                <p>Order</p>
                <p>${toCurrency(orderPrice)}</p>
            </div>
            <div>
                <p>Delivery</p>
                <p>${toCurrency(deliveryPrice)}</p>
            </div>
            <div>
                <p>Tax</p>
                <p>${toCurrency(taxPrice)}</p>
            </div>
            <div>
                <p>App Cost</p>
                <p>${toCurrency(appPrice)}</p>
            </div>

            <hr/>

            <div>
                <p>Total</p>
                <p>${toCurrency(totalPrice)}</p>
            </div>
        `;
        
        modelContainer.appendChild(contentDiv);

    } catch (error) {
        console.log(error)
    }
}