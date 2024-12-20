const role = localStorage.getItem("role");
const transactionNav = document.getElementById("profile-transaction");
const manageNav = document.getElementById("profile-admin");
const contactNav = document.getElementById("profile-contact");

const adminWrapper = document.getElementById("admin-wrapper");

const url = new URL(window.location.href);
const newsId = url.pathname.split('/').pop();

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

const fetchNewsData = async (newsId) => {
    try {
        const response = await fetch(`/api/news/${newsId}`);
        if (!response.ok) throw new Error("Failed to fetch news");
        return await response.json();
    } catch (error) {
        console.error("Error fetching news data:", error);
        throw error;
    }
};

const createNewsForm = (news) => {
    const form = document.createElement("form");
    form.innerHTML = `
        <label>Title</label>
        <input id="title" type="text" value="${news.title}" required />
        <label>Description</label>
        <input id="description" type="text" value="${news.description}" required />
        <label>Date</label>
        <input id="date" type="text" value="${news.date}" required />
        <label>Image</label>
        <input id="image" type="text" value="${news.image}" required />
       
        <button type="submit">Update News</button>
    `;
    return form;
};

const handleFormSubmit = async (event, newsId) => {
    event.preventDefault();

    const newsData = {
        newsId,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value,
        image: document.getElementById("image").value,
    };

    try {
        const response = await fetch("/api/news/update-news", {
            method: "PUT",
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
};

window.onload = async () => {
    manageNav.classList.add("profile-active");

    try {
        const news = await fetchNewsData(newsId);
        const form = createNewsForm(news);

        adminWrapper.appendChild(form);

        form.addEventListener("submit", (event) => handleFormSubmit(event, newsId));
    } catch (error) {
        console.error("Error initializing page:", error);
    }
};