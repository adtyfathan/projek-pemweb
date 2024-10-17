const newsContent = document.getElementById("news-content");

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getNewsId(){
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

window.onload = async function () {
    const newsId = getNewsId();

    try {
        const response = await fetch(`/api/news/${newsId}`);
        if (!response.ok) throw new Error('Failed to fetch news data');

        const news = await response.json();

        let contentDiv = document.createElement("div");

        contentDiv.innerHTML = `
            <div class="banner">
                <a href="/news">NEWS</a>
                <p>/</p>
                <p class="banner-child" style="margin-left: 15px;">${news.title}</p>
            </div>
            <h1 class="news-content-child-header">${news.title}</h1>
            <img src="${news.image}" class="news-content-child-image"/>
            <p class="news-content-child-date">${news.date}</p>
            <p class="news-content-child-desc">${news.description}</p>
            <h1 style="margin: 100px 0 50px 0">OTHER NEWS</h1>
        `;

        newsContent.appendChild(contentDiv);

        const responseNewses = await fetch("/api/news");
        if (!responseNewses.ok) throw new Error("Failed to fetch newses");
        const newses = await responseNewses.json();

        for (let i = 0; i < 3; i++) {
            let randomNum = Math.floor(Math.random() * newses.length)
            const randomDiv = document.createElement("div");
            randomDiv.innerHTML = `
            <div class="news-container">
                <img src="${newses[randomNum].image}" width="100" />
                <div class="news-content">
                    <h4>${newses[randomNum].date}</h4>
                    <h1>${newses[randomNum].title}</h1>
                    <div>
                        <button class="news-button">READ MORE</button>
                    </div>
                </div>
            </div>
        `;
            const button = randomDiv.querySelector(".news-button");
            button.addEventListener("click", () => {
                window.location.href = `/news/${newses[randomNum]._id}`
            });
            newsContent.appendChild(randomDiv);
        }
    } catch (error){
        console.log(error)
    }
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});
