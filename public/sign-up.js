document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        window.location.href = "/";
    }

    document.getElementById("register-button").addEventListener("click", async (event) => {
        event.preventDefault();

        let email = document.getElementById('input-email').value;
        let username = document.getElementById('input-username').value;
        let password = document.getElementById('input-password').value;
        let confirmPassword = document.getElementById('confirm-password').value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (password !== confirmPassword) {
            alert("Password do not match!");
            return;
        }

        if (!passwordRegex.test(password)){
            alert("Password invalid!");
            return;
        }

        try {
            const response = await fetch("/sign-up", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            if (response.ok) {
                window.location.href = "/login";
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error){
            alert(error.message);
        }
    })
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle-password")) {
        const passwordInput = event.target.previousElementSibling;
        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";
    }
});