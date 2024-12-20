const role = localStorage.getItem("role");
const transactionNav = document.getElementById("profile-transaction");
const manageNav = document.getElementById("profile-admin");
const contactNav = document.getElementById("profile-contact");

const adminWrapper = document.getElementById("admin-wrapper");
const form = document.getElementById("form");

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
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newsData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value,
        image: document.getElementById("image").value,
    };

    try {
        const response = await fetch("/api/news/insert-news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newsData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update news");
        }

        alert("News data updated successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error updating news:", error);
        alert("An error occurred while updating the news.");
    }
})