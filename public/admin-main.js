const role = localStorage.getItem("role");
const transactionNav = document.getElementById("profile-transaction");
const manageNav = document.getElementById("profile-admin");
const contactNav = document.getElementById("profile-contact");

const adminWrapper = document.getElementById("admin-wrapper");

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
    try {
        const usersResponse = await fetch("/api/users");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const users = await usersResponse.json();

        const adminsResponse = await fetch("/api/admins");
        if (!adminsResponse.ok) throw new Error("Failed to fetch admins");
        const admins = await adminsResponse.json();

        const carsResponse = await fetch("/api/cars");
        if (!carsResponse.ok) throw new Error("Failed to fetch cars");
        const cars = await carsResponse.json();

        const newsResponse = await fetch("/api/news");
        if (!newsResponse.ok) throw new Error("Failed to fetch news");
        const news = await newsResponse.json();

        let transactionArr = [];
        
        users.forEach(user => {
            for(let i = 0; i < user.transaction.length; i++){
                transactionArr.push(user.transaction[i]); 
            }
        });

        let totalLike = 0;

        cars.forEach(car => {
            totalLike += car.like;
        });

        news.forEach(news => {
            totalLike += news.like;
        });




        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
            <div>

                <div>
                    <img src="/images/edit.png" />
                    <h1>${users.length}</h1>
                    <p>Total User</p>
                </div>

                <div>
                    <img src="/images/edit.png" />
                    <h1>${admins.length}</h1>
                    <p>Total Admin</p>
                </div>

                <div>
                    <img src="/images/edit.png" />
                    <h1>${cars.length}</h1>
                    <p>Total Products</p>
                </div>

                <div>
                    <img src="/images/edit.png" />
                    <h1>${news.length}</h1>
                    <p>Total News</p>
                </div>

                <div>
                    <img src="/images/edit.png" />
                    <h1>${transactionArr.length}</h1>
                    <p>Total Transaksi</p>
                </div>

                <div>
                    <img src="/images/edit.png" />
                    <h1>${totalLike}</h1>
                    <p>Jumlah Like</p>
                </div>
            </div>
        `;
        adminWrapper.appendChild(contentDiv)
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});