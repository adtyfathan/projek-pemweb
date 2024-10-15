import { news } from "./datas.js"

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

const newsContent = document.getElementById("news-content");

function getQueryParams() {
    return new URLSearchParams(window.location.search);
}

window.onload = function () {
    const params = getQueryParams();
    let contentDiv = document.createElement("div");
    contentDiv.innerHTML = `
        <div class="banner">
            <a href="./news.html">NEWS</a>
            <p>/</p>
            <p class="banner-child" style="margin-left: 15px;">${params.get("title")}</p>
        </div>
        <h1 class="news-content-child-header">${params.get("title")}</h1>
        <img src="${params.get("image")}" class="news-content-child-image"/>
        <p class="news-content-child-date">${params.get("date")}</p>
        <p class="news-content-child-desc">${params.get("description")}</p>
        <h1 style="margin: 100px 0 50px 0">OTHER NEWS</h1>
    `;

    newsContent.appendChild(contentDiv);

    for (let i = 0; i < 3; i++) {
        let randomNum = Math.floor(Math.random() * news.length)
        const randomDiv = document.createElement("div");
        randomDiv.innerHTML = `
            <div class="news-container">
                <img src="${news[randomNum].image}" width="100" />
                <div class="news-content">
                    <h4>${news[randomNum].date}</h4>
                    <h1>${news[randomNum].title}</h1>
                    <div>
                        <button class="news-button">READ MORE</button>
                    </div>
                </div>
            </div>
        `;
        const button = randomDiv.querySelector(".news-button");
        button.addEventListener("click", () => redirect(news[randomNum]));
        newsContent.appendChild(randomDiv);
    }
}

function redirect(item) {
    var queryString = new URLSearchParams(item).toString();
    window.location.href = `./news-child.html?${queryString}`;
    console.log(queryString);
}
