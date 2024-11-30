const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getTransactionId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

const profileContainer = document.getElementById("profile-transaction-child-wrapper");
const backImg = document.getElementById("transaction-back");
const userId = localStorage.getItem("id");
const transactionId = getTransactionId();

window.onload = async () => {
    document.getElementById("profile-transaction").classList.add("profile-active");

    try {
        const responseTransaction = await fetch(`/api/user/transaction/${transactionId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ userId })
        });
        if (!responseTransaction.ok) throw new Error('Failed to fetch transaction data');
        const transaction = await responseTransaction.json();

        console.log(transaction);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("profile-transaction-child-container");
        contentDiv.innerHTML = `
            <div class="profile-transaction-child-container-left">
                <h1 style="margin-bottom: 40px;">Auto Boost</h1>
                <p style="font-size: 20px;">${transaction.brand} ${transaction.model}</p>
                <h2 style="margin-bottom: 40px;">${toCurrency(transaction.total_price)}</h2>
                <h3 style="margin-bottom: 10px;">Order Summary</h3>
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
            </div>
            
            <div class="profile-transaction-child-container-right">
                <h2>#${transaction.id}</h2>

                <div class="profile-transaction-child-sub">
                    <h4>Date</h4>
                    <p>${formattedDate(transaction.createdAt)}</p>
                </div>

                <div class="profile-transaction-child-sub">
                    <h4>Payment</h4>
                    <p>${transaction.payment_option}</p>
                </div>

                <div class="profile-transaction-child-sub">
                    <h4>Shipment</h4>
                    <table class="profile-transaction-child-table">
                        <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>${transaction.address}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>:</td>
                            <td>${transaction.country}</td>
                        </tr>
                        <tr>
                            <td>Region</td>
                            <td>:</td>
                            <td>${transaction.region}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>${transaction.city}</td>
                        </tr>
                        <tr>
                            <td>Postal Code</td>
                            <td>:</td>
                            <td>${transaction.postal_code}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>:</td>
                            <td>${transaction.phone_number}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>:</td>
                            <td>${transaction.status}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
        profileContainer.appendChild(contentDiv);

        function formattedDate(input) {
            const date = new Date(input);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        function toCurrency(integerValue) {
            const formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(integerValue);
            return formattedPrice;
        }
    } catch(error){
        console.log(error)
    }
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});

backImg.addEventListener("click", () => {
    window.location.href = "/profile-transaction";
})