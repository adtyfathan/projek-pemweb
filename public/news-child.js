const newsContent = document.getElementById("news-content");

const starUrl = "/images/star.png";
const filledStarUrl = "/images/star_filled.png"
const userId = localStorage.getItem("id");
const likeUrl = "/images/like_black.png";
const likeFilledUrl = "/images/like_filled.png";
const column = "liked_news";
let isLiked = false;

let starValue = 1;
let userLikes = null;
const role = localStorage.getItem("role");

function getNewsId(){
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

const newsId = getNewsId();

function handleRating(element) {
    if (role !== "user") {
        alert("You dont have the access!");
        if (!role) window.location.href = "/login";
        return;
    }

    const indexValue = element.getAttribute("data-index");
    for (let i = 1; i <= 5; i++) {
        if (i <= indexValue) {
            document.querySelector(`[data-index="${i}"]`).src = filledStarUrl;
        } else {
            document.querySelector(`[data-index="${i}"]`).src = starUrl;
        }
    }
    starValue = indexValue;
    document.getElementById("comment-score").value = starValue;
}

window.onload = async function () {
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
            
            <div class="news-content-child-sub">
                <p class="news-content-child-date">${news.date}</p>
                <div class="like-container news-content-like">
                    <p id="like-count">${news.like}</p>
                    <img src="/images/like_black.png" id="like-image" />
                </div>
            </div>
            
            <p class="news-content-child-desc">${news.description}</p>
            <h1 style="margin: 100px 0 50px 0">OTHER NEWS</h1>
        `;

        newsContent.appendChild(contentDiv);

        const responseNewses = await fetch("/api/news");
        if (!responseNewses.ok) throw new Error("Failed to fetch newses");
        const newses = await responseNewses.json();

        const usedIndices = new Set();

        for (let i = 0; i < 3; i++) {
            let randomNum;

            do {
                randomNum = Math.floor(Math.random() * newses.length);
            } while (usedIndices.has(randomNum) || newses[randomNum]._id == news._id); 

            usedIndices.add(randomNum);

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

        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-wrapper");
        commentDiv.innerHTML = `
            <div class="comment-input-container">
                <form id="comment-form">
                    <textarea id="comment-message" placeholder="Add a Comment" rows=8></textarea>
                    <input id="comment-score" type="hidden" value="${starValue}"/>
                    <div style="display: flex; justify-content: space-between;">
                        <div class="comment-input-star">
                            <img data-index="1" src="${starUrl}"/>
                            <img data-index="2" src="${starUrl}"/>
                            <img data-index="3" src="${starUrl}"/>
                            <img data-index="4" src="${starUrl}"/>
                            <img data-index="5" src="${starUrl}"/>
                        </div>
                        <input type="submit" class="comment-button"/>
                    </div>
                <form>
            </div>
            <hr style="margin: 50px 0"></hr>

            <div class="comment-header">
                <p>Comments</p>
                <h3> ${news.comment.length}</h3>
            </div>
            
            ${news.comment.map(comment => `
                <div class="comment-container">
                    <div class="comment-image">
                        <img src="${comment.image}"/>
                    </div>
                    <div class="comment-display">
                        <div class="comment-display-header">
                            <h2>${comment.name}</h2>
                            <div>
                                <img src="${comment.score >= 1 ? filledStarUrl : starUrl}"/>
                                <img src="${comment.score >= 2 ? filledStarUrl : starUrl}"/>
                                <img src="${comment.score >= 3 ? filledStarUrl : starUrl}"/>
                                <img src="${comment.score >= 4 ? filledStarUrl : starUrl}"/>
                                <img src="${comment.score >= 5 ? filledStarUrl : starUrl}"/>
                            </div>
                            <p>${(() => {
                    // ngeformat tanggal
                    const date = new Date(comment.createdAt);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                })()}</p>
                        </div>
                        <p>${comment.message}</p>
                    </div>
                </div>
            `).join("")
            }
        `;

        const starImages = commentDiv.querySelectorAll(".comment-input-star img");
        starImages.forEach((img) => {
            img.addEventListener("click", function () {
                handleRating(img);
            });
        });

        newsContent.appendChild(commentDiv);

        const commentInput = document.getElementById("comment-message");

        if (role !== "user") {
            commentInput.addEventListener("click", () => {
                alert("You dont have the access!");
                commentInput.disabled = "true";
                commentInput.placeholder = "can't comment";
                if (!role) window.location.href = "/login";
                return;
            })
        }

        const likeImg = document.getElementById("like-image");
        const likeCount = document.getElementById("like-count");

        if (userId){
            const responseIsLiked = await fetch(`/api/user/${userId}`);
            if (!responseIsLiked.ok) throw new Error('Failed to fetch user data');
            const dataIsLiked = await responseIsLiked.json()
            const likedNews = dataIsLiked.liked_news;
            if (likedNews.includes(news._id)) isLiked = true;
            changeDisplay(news);
        }

        document.getElementById("comment-form").addEventListener("submit", async (event) => {
            try {
                event.preventDefault();
                const userId = localStorage.getItem("id");
                const responseUser = await fetch(`/api/user/${userId}`);
                if (!responseUser.ok) throw new Error('Failed to fetch user data');

                const user = await responseUser.json();

                const name = user.username;
                const image = user.image;
                const score = parseInt(document.getElementById("comment-score").value);
                const message = document.getElementById("comment-message").value;

                const newsId = getNewsId();

                const responseComment = await fetch(`/api/news/${newsId}/comment`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ name, image, score, message })
                });

                if (responseComment.ok) {
                    alert('Comment added!');
                    document.getElementById('comment-form').reset();
                    window.location.reload();
                } else {
                    throw new Error('Failed to add comment data');
                }
            } catch (error) {
                console.log(error);
            }
        })

        likeImg.addEventListener("click", async () => {
            if (role !== "user") {
                alert("You dont have the access");
                if (!role) window.location.href = "/login";
                return;
            } 

            const id = newsId;
            const instanceId = newsId;
            const route = (isLiked === true) ? "/api/user/remove-liked" : "/api/user/add-liked";
            const count = (isLiked === true) ? -1 : 1;

            try {
                const responseLike = await fetch(route, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, instanceId, column }),
                });

                if (!responseLike.ok) throw new Error("Failed to update like status");

                const responseLikeCount = await fetch("/api/news/handle-like", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, count })
                })

                if (!responseLikeCount.ok) throw new Error("Failed to update like count");
                const updatedData = await responseLikeCount.json();

                isLiked = !isLiked;
                changeDisplay(updatedData);

            } catch (error) {
                console.error("Error updating like status:", error);
            }
        });

        function changeDisplay(item) {
            likeImg.src = isLiked ? likeFilledUrl : likeUrl;
            likeCount.textContent = item.like;
        }

    } catch (error){
        console.log(error)
    }
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});
