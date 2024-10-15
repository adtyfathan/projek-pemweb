const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});