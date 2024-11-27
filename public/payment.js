const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getTransactionId() {
    const pathParts = window.location.pathname.split('/'); 
    return pathParts[pathParts.length - 1];
}

const transactionId = getTransactionId();
const userId = localStorage.getItem("id");

const paymentContainer = document.getElementById("payment-wrapper");

function toCurrency(integerValue) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(integerValue);
    return formattedPrice;
}

setTimeout(() => {
    window.location.href = `/payment-complete/${transactionId}`;
}, 10000);

window.onload = async function () {
    try {
        const response = await fetch(`/api/user/transaction/${transactionId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ userId })
        });

        const transaction = await response.json();

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
            <div class="payment-container">
                <div class="payment-header">
                    <h1>Payment Detail</h1>
                    <p>#${transaction.id}</p>
                </div>
                
                <p class="payment-brand">${transaction.brand} ${transaction.model}</p>
                <p class="checkout-summary-title">Order Summary</p>

                <hr/>

                <div class="checkout-summary-row">
                    <p>Order</p>
                    <p id="order-price">${toCurrency(transaction.order_price)}</p>
                </div>
                <div class="checkout-summary-row">
                    <p>Delivery</p>
                    <p id="delivery-price">${toCurrency(transaction.delivery_price)}</p>
                </div>
                <div class="checkout-summary-row">
                    <p>Tax</p>
                    <p id="tax-price">${toCurrency(transaction.tax_price)}</p>
                </div>
                <div class="checkout-summary-row">
                    <p>App Cost</p>
                    <p id="app-price">${toCurrency(transaction.app_price)}</p>
                </div>

                <hr/>

                <div class="checkout-summary-row">
                    <p class="checkout-summary-title">Total</p>
                    <p class="checkout-summary-title" id="total-price">${toCurrency(transaction.total_price)}</p>
                </div>

                <div class="checkout-summary-row">
                    <p class="checkout-summary-title">Virtual Account Number</p>
                    <p class="checkout-summary-title" id="total-price">1234081234567890</p>
                </div>
            </div>

            <div class="payment-instruction">
                <img src="/images/exclamation.png"/>
                <p>You will be redirected after the payment is completed</p>
            </div>
        `;
        paymentContainer.appendChild(contentDiv);
    } catch(error){
        console.log(error)
    }
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});