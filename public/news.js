import { news } from "./datas.js";

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

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
    button.addEventListener("click", () => redirect(item));
    newsWrapper.appendChild(contentDiv);
})

function redirect(item) {
    var queryString = new URLSearchParams(item).toString();
    window.location.href = `./news-child.html?${queryString}`;
    console.log(queryString);
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});
