const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

let news;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/news");
        if (!response.ok) throw new Error("Failed to fetch news");
        news = await response.json();

        const newsWrapper = document.querySelector(".news-wrapper");

        news.forEach(item => {
            const contentDiv = document.createElement("div");
            contentDiv.classList.add("news-container");
            contentDiv.innerHTML = `
                <img src="${item.image}" width="100" />
                <div class="news-content">
                    <h4>${item.date}</h4>
                    <h1>${item.title}</h1>
                    <div>
                        <button class="news-button">READ MORE</button>
                    </div>
                </div>
            `;
            const button = contentDiv.querySelector(".news-button");
            button.addEventListener("click", () => {
                window.location.href = `/news/${item._id}`
            });
            newsWrapper.appendChild(contentDiv);
        })
    } catch(error){
        console.log(error)
    }
})


document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});
