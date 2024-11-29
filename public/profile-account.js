const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

window.onload = async () => {
    document.getElementById("profile-account").classList.add("profile-active");
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});