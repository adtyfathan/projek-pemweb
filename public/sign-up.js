document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        window.location.href = "/";
    }

    document.querySelector(".login-button").addEventListener("click", async (event) => {
        event.preventDefault();

        let email = document.getElementById('input-email').value;
        let username = document.getElementById('input-username').value;
        let password = document.getElementById('input-password').value;
        let role = document.getElementById('input-role').value;

        const response = await fetch("/sign-up", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password, role })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            alert("Login failed");
        }
    })
});