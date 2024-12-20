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

const userId = localStorage.getItem("id");
const emailInput = document.getElementById("email");
const accountForm = document.getElementById("profile-account-form");
const togglePassword = document.getElementById("toggle-password");

window.onload = async () => {
    document.getElementById("profile-account").classList.add("profile-active");

    try {
        const responseUser = await fetch(`/api/user/${userId}`);
        if (!responseUser.ok) throw new Error('Failed to fetch user data');
        const user = await responseUser.json();

        emailInput.value = user.email;

        accountForm.addEventListener("submit", async(event) => {
            event.preventDefault();

            const oldPassword = document.getElementById("old-password").value;
            const newPassword = document.getElementById("new-password").value;

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                alert("New Password format invalid!");
                return;
            }

            const responsePassword = await fetch("/api/user/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, oldPassword, newPassword })
            });
            if(responsePassword.ok){
                alert("Password changed!");
                window.location.reload();
            } else {
                const errorData = await responsePassword.json();
                alert(errorData.message || "An error occurred.");
            }
        });
    } catch (error){
        console.log(error)
    }
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle-password")) {
        const passwordInput = event.target.previousElementSibling;
        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";
    }
});

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});