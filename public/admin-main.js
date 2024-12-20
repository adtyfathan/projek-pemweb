const role = localStorage.getItem("role");
const transactionNav = document.getElementById("profile-transaction");
const manageNav = document.getElementById("profile-admin");
const contactNav = document.getElementById("profile-contact");

const adminWrapper = document.getElementById("admin-wrapper");
const popWrapper = document.getElementById("pop-wrapper");

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
        const [usersResponse, adminsResponse, carsResponse, newsResponse] = await Promise.all([
            fetch("/api/users"),
            fetch("/api/admins"),
            fetch("/api/cars"),
            fetch("/api/news"),
        ]);

        if (!usersResponse.ok || !adminsResponse.ok || !carsResponse.ok || !newsResponse.ok) {
            throw new Error("Failed to fetch one or more resources");
        }

        const users = await usersResponse.json();
        const admins = await adminsResponse.json();
        const cars = await carsResponse.json();
        const news = await newsResponse.json();

        const transactionArr = users.flatMap(user => user.transaction);
        const totalLike = [...cars, ...news].reduce((sum, item) => sum + item.like, 0);
        const commentArr = [...cars, ...news].flatMap(item => item.comment);

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
            <div>
                <div>
                    <img src="/images/edit.png" id="edit-user"/>
                    <h1>${users.length}</h1>
                    <p>Total User</p>
                </div>
                <div>
                    <img src="/images/edit.png" id="edit-admin"/>
                    <h1>${admins.length}</h1>
                    <p>Total Admin</p>
                </div>
                <div>
                    <img src="/images/edit.png" id="edit-product"/>
                    <h1>${cars.length}</h1>
                    <p>Total Products</p>
                </div>
                <div>
                    <img src="/images/edit.png" id="edit-news"/>
                    <h1>${news.length}</h1>
                    <p>Total News</p>
                </div>
                <div>
                    <img src="/images/edit.png" id="edit-transaksi"/>
                    <h1>${transactionArr.length}</h1>
                    <p>Total Transaksi</p>
                </div>
                <div>
                    <img src="/images/edit.png" id="edit-like"/>
                    <h1>${totalLike}</h1>
                    <p>Total Like</p>
                </div>
                <div>
                    <img src="/images/edit.png" id="edit-comment"/>
                    <h1>${commentArr.length}</h1>
                    <p>Total Comment</p>
                </div>
            </div>
        `;
        adminWrapper.appendChild(contentDiv);

        // user button
        const userBtn = document.getElementById("edit-user");
        userBtn.addEventListener("click", () => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("pop-wrapper");

            let userContent = `
                <div>
                    <h1>Manage User</h1>
                    <img src="/images/user-icon.png" alt="User Icon"/>
                    <img src="/images/close-icon.png" alt="Close Icon" id="close-user"/>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Operation</th>
                    </tr>
            `;
            users.forEach(user => {
                userContent += `
                    <tr>
                        <td>${user._id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td><p>Delete</p></td>
                    </tr>
                `;
            });
            userContent += '</table>';

            userDiv.innerHTML = userContent;
            popWrapper.innerHTML = ''; 
            popWrapper.appendChild(userDiv);

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
            });
        });

        // admin button
        const adminBtn = document.getElementById("edit-admin");
        adminBtn.addEventListener("click", () => {
            const adminDiv = document.createElement("div");
            adminDiv.classList.add("pop-wrapper");

            let adminContent = `
                <div>
                    <h1>Manage Admin</h1>
                    <img src="/images/user-icon.png" alt="User Icon"/>
                    <img src="/images/close-icon.png" alt="Close Icon" id="close-user"/>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Operation</th>
                    </tr>
            `;
            admins.forEach(admin => {
                adminContent += `
                    <tr>
                        <td>${admin._id}</td>
                        <td>${admin.username}</td>
                        <td>${admin.email}</td>
                        <td><p>Delete</p></td>
                    </tr>
                `;
            });
            adminContent += '</table>';

            adminDiv.innerHTML = adminContent;
            popWrapper.innerHTML = '';
            popWrapper.appendChild(adminDiv);

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
            });
        });

    } catch (error) {
        console.error("Error loading data:", error);
    }
};

// Logout functionality
document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});
