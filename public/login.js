document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        window.location.href = "/";
    }

    document.getElementById("login-button").addEventListener("click", async (event) => {
        event.preventDefault();

        let email = document.getElementById('input-email').value;
        let password = document.getElementById('input-password').value;
        
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem("id", data.id);
                localStorage.setItem("role", data.role);
                window.location.href = '/';
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