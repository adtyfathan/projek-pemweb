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

        const priceInt = Number(car.price.replace(/[\$,]/g, ""));
        let orderPrice = priceInt * qty;
        let deliveryPrice = orderPrice * 0.0005;
        let taxPrice = orderPrice * 0.1;
        let appPrice = priceInt * 0.001;
        let totalPrice = orderPrice + deliveryPrice + taxPrice + appPrice;

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
            <div class="checkout-summary-header">
                <img src="${car.image}" />
                <div class="checkout-summary-header-text">
                    <p>${car.brand} ${car.model}</p>
                    <p>${car.price}</p>
                </div>
                
            </div>
            
            <p class="checkout-summary-title">Order Summary</p>

            <hr/>

            <div class="checkout-summary-row">
                <p>Order</p>
                <p id="order-price">${toCurrency(orderPrice)}</p>
            </div>
            <div class="checkout-summary-row">
                <p>Delivery</p>
                <p id="delivery-price">${toCurrency(deliveryPrice)}</p>
            </div>
            <div class="checkout-summary-row">
                <p>Tax</p>
                <p id="tax-price">${toCurrency(taxPrice)}</p>
            </div>
            <div class="checkout-summary-row">
                <p>App Cost</p>
                <p id="app-price">${toCurrency(appPrice)}</p>
            </div>

            <hr/>

            <div class="checkout-summary-row">
                <p class="checkout-summary-title">Total</p>
                <p class="checkout-summary-title" id="total-price">${toCurrency(totalPrice)}</p>
            </div>

            <div class="checkout-qty">
                <img src="/images/minus.png" id="sub"/>
                <p>${qty}</p>
                <img src="/images/plus.png" id="add"/>
            </div>
        `;
        
        modelContainer.appendChild(contentDiv);

        document.getElementById("sub").addEventListener("click", () => {
            if (qty > 1) {
                qty--;
                countPrice();
                displayPrice();
            }
        })

        document.getElementById("add").addEventListener("click", () => {
            qty++;
            countPrice();
            displayPrice();
        })

        document.getElementById("button-logout").addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "/login";
        });

        function countPrice(){
            orderPrice = priceInt * qty;
            deliveryPrice = orderPrice * 0.0005;
            taxPrice = orderPrice * 0.1;
            appPrice = priceInt * 0.001;
            totalPrice = orderPrice + deliveryPrice + taxPrice + appPrice;
        }

        function displayPrice(){
            document.querySelector(".checkout-qty p").textContent = qty;
            document.getElementById("order-price").textContent = toCurrency(orderPrice);
            document.getElementById("delivery-price").textContent = toCurrency(deliveryPrice);
            document.getElementById("tax-price").textContent = toCurrency(taxPrice);
            document.getElementById("app-price").textContent = toCurrency(appPrice);
            document.getElementById("total-price").textContent = toCurrency(totalPrice);
        }

    } catch (error) {
        console.log(error)
    }
}