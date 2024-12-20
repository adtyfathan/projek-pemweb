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
        const responseUsers = await fetch("/api/users");
        if (!responseUsers.ok) throw new Error("Failed to fetch users");
        const users = await responseUsers.json();

        let userTable = document.createElement("table");
        userTable.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Account</th>
                <th>Operation</th>
            </tr>
        `;

        for(let i = 0; i < users.length; i++){
            userTable.innerHTML += `
                <tr>
                    <td>${users[i]._id}</td>
                    <td>${users[i].username}</td>
                    <td>${users[i].email}</td>
                    <td><p class="add-btn" data-id="${users[i]._id}">Add Admin</p></td>
                </tr>
            `;
        }

        adminWrapper.appendChild(userTable);

        const addButtons = document.querySelectorAll(".add-btn");
        addButtons.forEach(button => {
            button.addEventListener("click", async (event) => {
                const userId = event.target.getAttribute("data-id");
                const role = "admin";
                try {
                    const response = await fetch(`/api/manage-admin/${userId}`, {
                        method: "PUT",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ role })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Failed to add admin");
                    }

                    alert("Admin added successfully");
                    event.target.closest("tr").remove();
                } catch (error) {
                    console.error("Error Adding admin:", error);
                    alert("An error occurred while trying to add admin.");
                }
            });
        });
    } catch (error){
        console.error(error);
    }
}