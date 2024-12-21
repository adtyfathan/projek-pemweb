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
        contentDiv.classList.add("content-container");
        contentDiv.innerHTML = `
                <div class="manage-container">
                    <img src="/images/edit.png" id="edit-user"/>
                    <h1>${users.length}</h1>
                    <p>Total User</p>
                </div>
                <div class="manage-container">
                    <img src="/images/edit.png" id="edit-admin"/>
                    <h1>${admins.length}</h1>
                    <p>Total Admin</p>
                </div>
                <div class="manage-container">
                    <img src="/images/edit.png" id="edit-product"/>
                    <h1>${cars.length}</h1>
                    <p>Total Products</p>
                </div>
                <div class="manage-container">
                    <img src="/images/edit.png" id="edit-news"/>
                    <h1>${news.length}</h1>
                    <p>Total News</p>
                </div>
                <div class="manage-container">
                    <img src="/images/edit.png" id="edit-transaksi"/>
                    <h1>${transactionArr.length}</h1>
                    <p>Total Transaksi</p>
                </div>
                <div class="manage-container">
                    <h1>${totalLike}</h1>
                    <p>Total Like</p>
                </div>
                <div class="manage-container">
                    <img src="/images/edit.png" id="edit-comment"/>
                    <h1>${commentArr.length}</h1>
                    <p>Total Comment</p>
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
                        <td><p class="delete-btn" data-id="${user._id}">Delete</p></td>
                    </tr>
                `;
            });
            userContent += '</table>';

            userDiv.innerHTML = userContent;
            popWrapper.innerHTML = '';
            popWrapper.appendChild(userDiv);
            document.getElementById("pop-wrapper").classList.add("show");

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
                document.getElementById("pop-wrapper").classList.remove("show");
            });

            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", async (event) => {
                    const userId = event.target.getAttribute("data-id");
                    try {
                        const response = await fetch(`/api/delete-user/${userId}`, {
                            method: "DELETE",
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Failed to delete user");
                        }

                        alert("User deleted successfully");
                        event.target.closest("tr").remove();
                    } catch (error) {
                        console.error("Error deleting user:", error);
                        alert("An error occurred while trying to delete the user.");
                    }
                });
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
                    <a href="/admin-add">Add New</a>
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
                        <td><p class="delete-btn" data-id="${admin._id}">Delete</p></td>
                    </tr>
                `;
            });
            adminContent += '</table>';

            adminDiv.innerHTML = adminContent;
            popWrapper.innerHTML = '';
            popWrapper.appendChild(adminDiv);
            document.getElementById("pop-wrapper").classList.add("show");

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
                document.getElementById("pop-wrapper").classList.remove("show");
            });

            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", async (event) => {
                    const adminId = event.target.getAttribute("data-id");
                    const role = "user";
                    try {
                        const response = await fetch(`/api/manage-admin/${adminId}`, {
                            method: "PUT",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ role })
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Failed to delete admin");
                        }

                        alert("Admin deleted successfully");
                        event.target.closest("tr").remove();
                    } catch (error) {
                        console.error("Error deleting admin:", error);
                        alert("An error occurred while trying to delete the admin.");
                    }
                });
            });
        });

        // product button
        const productBtn = document.getElementById("edit-product");
        productBtn.addEventListener("click", () => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("pop-wrapper");

            let productContent = `
                <div>
                    <h1>Manage Product</h1>
                    <img src="/images/user-icon.png" alt="User Icon"/>
                    <img src="/images/close-icon.png" alt="Close Icon" id="close-user"/>
                    <a href="/product-add">Add New</a>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Like</th>
                        <th>Operation</th>
                    </tr>
            `;

            cars.forEach(car => {
                productContent += `
                    <tr>
                        <td>${car._id}</td>
                        <td>${car.model}</td>
                        <td>${car.brand}</td>
                        <td>${car.price}</td>
                        <td>${car.like}</td>
                        <td><a href="/product-edit/${car._id}">Edit</a><p class="delete-btn" data-id="${car._id}">Delete</p></td>
                    </tr>
                `;
            });
            productContent += '</table>';

            productDiv.innerHTML = productContent;
            popWrapper.innerHTML = '';
            popWrapper.appendChild(productDiv);
            document.getElementById("pop-wrapper").classList.add("show");

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
                document.getElementById("pop-wrapper").classList.remove("show");
            });

            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", async (event) => {
                    const carId = event.target.getAttribute("data-id");
                    try {
                        const response = await fetch(`/api/delete-car/${carId}`, {
                            method: "DELETE",
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Failed to delete car");
                        }

                        alert("Car deleted successfully");
                        event.target.closest("tr").remove();
                    } catch (error) {
                        console.error("Error deleting car:", error);
                        alert("An error occurred while trying to delete car.");
                    }
                });
            });
        });


        // news button
        const newsBtn = document.getElementById("edit-news");
        newsBtn.addEventListener("click", () => {
            const newsDiv = document.createElement("div");
            newsDiv.classList.add("pop-wrapper");

            let newsContent = `
                <div>
                    <h1>Manage News</h1>
                    <img src="/images/user-icon.png" alt="User Icon"/>
                    <img src="/images/close-icon.png" alt="Close Icon" id="close-user"/>
                    <a href="/news-add">Add New</a>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Like</th>
                        <th>Operation</th>
                    </tr>
            `;

            news.forEach(news => {
                newsContent += `
                    <tr>
                        <td>${news._id}</td>
                        <td>${news.title}</td>
                        <td>${news.like}</td>
                        <td><a href="/news-edit/${news._id}">Edit</a><p class="delete-btn" data-id="${news._id}">Delete</p></td>
                    </tr>
                `;
            });
            newsContent += '</table>';

            newsDiv.innerHTML = newsContent;
            popWrapper.innerHTML = '';
            popWrapper.appendChild(newsDiv);
            document.getElementById("pop-wrapper").classList.add("show");

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
                document.getElementById("pop-wrapper").classList.remove("show");
            });

            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", async (event) => {
                    const newsId = event.target.getAttribute("data-id");
                    try {
                        const response = await fetch(`/api/news/delete-news/${newsId}`, {
                            method: "DELETE",
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Failed to delete news");
                        }

                        alert("News deleted successfully");
                        event.target.closest("tr").remove();
                    } catch (error) {
                        console.error("Error deleting news:", error);
                        alert("An error occurred while trying to delete news.");
                    }
                });
            });
        });


        // button transaksi
        const transaksiBtn = document.getElementById("edit-transaksi");
        transaksiBtn.addEventListener("click", () => {
            const transaksiDiv = document.createElement("div");
            transaksiDiv.classList.add("pop-wrapper");

            let transaksiContent = `
                <div>
                    <h1>Manage Transaksi</h1>
                    <img src="/images/user-icon.png" alt="User Icon"/>
                    <img src="/images/close-icon.png" alt="Close Icon" id="close-user"/>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Account</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Operation</th>
                    </tr>
            `;

            transactionArr.forEach(transaksi => {
                const dateStr = transaksi.createdAt;
                const date = new Date(dateStr);

                const formattedDate = date.getDate().toString().padStart(2, '0') + '/' +
                    (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
                    date.getFullYear();

                transaksiContent += `
                    <tr>
                        <td>${transaksi.id}</td>
                        <td>${transaksi.model}</td>
                        <td>${transaksi.email}</td>
                        <td>${formattedDate}</td>
                        <td>${transaksi.total_price}</td>
                        <td>${transaksi.status}</td>
                        <td><p class="delete-btn" data-user-id="${transaksi.user_id}" data-id="${transaksi.id}">Delete</p></td>
                    </tr>
                `;
            });
            transaksiContent += '</table>';

            transaksiDiv.innerHTML = transaksiContent;
            popWrapper.innerHTML = '';
            popWrapper.appendChild(transaksiDiv);
            document.getElementById("pop-wrapper").classList.add("show");

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
                document.getElementById("pop-wrapper").classList.remove("show");
            });

            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", async (event) => {
                    const transactionId = event.target.getAttribute("data-id");
                    const userId = event.target.getAttribute("data-user-id")
                    try {
                        const response = await fetch(`/api/user/${userId}/delete-transaction/${transactionId}`, {
                            method: "DELETE",
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Failed to delete transaction");
                        }

                        alert("Transaction deleted successfully");
                        event.target.closest("tr").remove();
                    } catch (error) {
                        console.error("Error deleting transaction:", error);
                        alert("An error occurred while trying to delete transaction.");
                    }
                });
            });
        });


        // button comment
        const commentBtn = document.getElementById("edit-comment");
        commentBtn.addEventListener("click", () => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("pop-wrapper");

            let commentContent = `
                <div>
                    <h1>Manage Comment</h1>
                    <img src="/images/user-icon.png" alt="User Icon"/>
                    <img src="/images/close-icon.png" alt="Close Icon" id="close-user"/>
                </div>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Comment</th>
                        <th>Operation</th>
                    </tr>
            `;

            commentArr.forEach(comment => {
                const dateStr = comment.createdAt;
                const date = new Date(dateStr);

                const formattedDate = date.getDate().toString().padStart(2, '0') + '/' +
                    (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
                    date.getFullYear();

                commentContent += `
                    <tr>
                        <td>${comment.name}</td>
                        <td>${formattedDate}</td>
                        <td>${comment.message}</td>
                        <td><p class="delete-btn">Delete</p</td>
                    </tr>
                `;
            });
            commentContent += '</table>';

            commentDiv.innerHTML = commentContent;
            popWrapper.innerHTML = '';
            popWrapper.appendChild(commentDiv);
            document.getElementById("pop-wrapper").classList.add("show");

            document.getElementById("close-user").addEventListener("click", () => {
                popWrapper.innerHTML = '';
                document.getElementById("pop-wrapper").classList.remove("show");
            });

            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", async (event) => {
                    try {
                        alert("Transaction deleted successfully");
                        event.target.closest("tr").remove();
                    } catch (error) {
                        console.error("Error deleting transaction:", error);
                        alert("An error occurred while trying to delete transaction.");
                    }
                });
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
