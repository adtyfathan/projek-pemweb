import { news } from "./datas.js";

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

const slideContainer = document.getElementById("slide-wrapper");
const newsContainer = document.getElementById("news-wrapper");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const responseCar = await fetch("/api/cars/top-cars")
        if (!responseCar.ok) throw new Error("Failed to fetch top cars models");
        const data = await responseCar.json();
    
        const slideDiv = document.createElement("div");
        slideDiv.innerHTML = `
            <div class="slide-container">
                <h4>TOP MODELS</h4>
                <div style="display: flex;">
                    <img id="sub-slide" src="./images/arrow-white.png" width="64"
                        style="transform: rotate(180deg); margin-right: 20px; cursor: pointer;" />
                    <img id="add-slide" src="./images/arrow-white.png" width="64" style="cursor: pointer;" />
                </div>
                <h1 class="slide-header"></h1>
                <h4 class="slide-sub"></h4>
            </div>

            <img src="${data[2].image}" width="100" data-index=0 class="slide-img" />
            <img src="${data[1].image}" width="100" data-index=1 class="slide-img" />
            <img src="${data[0].image}" width="100" data-index=2 class="slide-img active" />
        `;

        slideDiv.classList.add("slide-wrapper");
        slideContainer.appendChild(slideDiv);

        let activeSlide = 2;

        setSlideHeader();

        document.getElementById("sub-slide").addEventListener("click", subtSlide);
        document.getElementById("add-slide").addEventListener("click", addSlide);

        function addSlide() {
            document.querySelectorAll("[data-index]")[activeSlide].classList.remove("active");
            activeSlide = (activeSlide + 1) % 3;
            document.querySelectorAll("[data-index]")[activeSlide].classList.add("active");
            setSlideHeader();
        }

        function subtSlide() {
            document.querySelectorAll("[data-index]")[activeSlide].classList.remove("active");
            activeSlide = (activeSlide + 2) % 3;
            document.querySelectorAll("[data-index]")[activeSlide].classList.add("active");
            setSlideHeader();
        }

        function setSlideHeader() {
            if (activeSlide == 0) {
                document.querySelector(".slide-header").innerHTML = data[2].model;
                document.querySelector(".slide-sub").innerHTML = data[2].brand;
            } else if (activeSlide == 1) {
                document.querySelector(".slide-header").innerHTML = data[1].model;
                document.querySelector(".slide-sub").innerHTML = data[1].brand;
            } else if (activeSlide == 2) {
                document.querySelector(".slide-header").innerHTML = data[0].model;
                document.querySelector(".slide-sub").innerHTML = data[0].brand;
            }
        }

        const responseNews = await fetch("/api/news/top-news")
        if (!responseNews.ok) throw new Error("Failed to fetch top news");
        const newsData = await responseNews.json();

        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = `
            <h1 class="news-header">HEADLINE NEWS</h1>
            <img src="${newsData[0].image}" style="width: 100%;" />
            <div class="home-news-container">
                <div class="home-news-content">
                    <h4>${newsData[0].date}</h4>
                    <h1>${newsData[0].title}</h1>
                </div>
                <div class="home-news-button">
                    <button id="news-button0" class="news-button">
                        READ MORE
                    </button>
                </div>
            </div>
        `;

        for(let i = 1; i <= 3; i++){
            newsDiv.innerHTML += `
                <div class="news-container">
                    <img src="${newsData[i].image}" width="100" />
                    <div class="news-content">
                        <h4>${newsData[i].date}</h4>
                        <h1>${newsData[i].title}</h1>
                        <div>
                            <button id="news-button${i}" class="news-button">READ MORE</button>
                        </div>
                    </div>
                </div>
            `;
        }
       
        newsDiv.innerHTML += `
            <div style="text-align: center;">
                <a href="/news"><button class="news-redirect">SEE ALL</button></a>
            </div>
        `;

        newsDiv.classList.add("news-wrapper");
        newsContainer.appendChild(newsDiv);

        for (let i = 0; i <= 3; i++) {
            const newsButton = document.getElementById(`news-button${i}`);
            newsButton.addEventListener("click", () => {
                window.location.href = `/news/${newsData[i]._id}`;
            })
        }

    } catch (error){
        console.log(error);
    }
})

// manggil id user yang login
// const user = localStorage.getItem("id");
// console.log(user)

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});
