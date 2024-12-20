const role = localStorage.getItem("role");
const transactionNav = document.getElementById("profile-transaction");
const manageNav = document.getElementById("profile-admin");
const contactNav = document.getElementById("profile-contact");

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


const profileContainer = document.getElementById("profile-transaction-wrapper");
const userId = localStorage.getItem("id");

window.onload = async () => {
    document.getElementById("profile-transaction").classList.add("profile-active");

    try {
        const responseUser = await fetch(`/api/user/${userId}`);
        if (!responseUser.ok) throw new Error('Failed to fetch user data');
        const user = await responseUser.json();

        const transactionArr = user.transaction;

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("profile-transaction-container");
        contentDiv.innerHTML = `
            <h1>Transaction History</h1>

            <table class="transaction-table">
                <thead>
                    <tr>
                        <th class="transaction-table-row">Invoice ID</th>
                        <th class="transaction-table-row">Car Model</th>
                        <th class="transaction-table-row">Date</th>
                        <th class="transaction-table-row">Payment</th>
                        <th class="transaction-table-row">Amount</th>
                        <th class="transaction-table-row">Status</th>
                    </tr>
                </thead>
                <tbody id="transaction-table-body">

                </tbody>
            </table>
        `;
        
        profileContainer.appendChild(contentDiv);

        const tableBody = document.getElementById("transaction-table-body");

        for(let i = 0; i < transactionArr.length; i++){
            const contentRow = document.createElement("tr");
            contentRow.innerHTML = `
                <td class="transaction-table-row"><a href="/profile-transaction-child/${transactionArr[i].id}">${transactionArr[i].id}</a></td>
                <td class="transaction-table-row">${transactionArr[i].model}</td>
                <td class="transaction-table-row">${formattedDate(transactionArr[i].createdAt)}</td>
                <td class="transaction-table-row">${transactionArr[i].payment_option}</td>
                <td class="transaction-table-row">${toCurrency(transactionArr[i].total_price)}</td>
                <td class="transaction-table-row">${transactionArr[i].status}</td>
            `; 
            tableBody.appendChild(contentRow);
        }

        function formattedDate(input){
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
        console.log(error);
    }
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});