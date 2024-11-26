const modelContainer = document.getElementById("model-content");

const starUrl = "/images/star.png";
const filledStarUrl = "/images/star_filled.png"
let starValue = 1;

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getCarId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

function handleRating(element) {
    const indexValue = element.getAttribute("data-index");
    for(let i = 1; i <= 5; i++){
        if(i <= indexValue){
            document.querySelector(`[data-index="${i}"]`).src = filledStarUrl;
        } else {
            document.querySelector(`[data-index="${i}"]`).src = starUrl;
        }
    }
    starValue = indexValue;
    document.getElementById("comment-score").value = starValue;
}

window.onload = async function () {
    const carId = getCarId();

    try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) throw new Error('Failed to fetch car data');

        const car = await response.json();

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
        <div class="model-items-wrapper">
            <div class="model-items-container" style="display: block;">
                <h4 style="font-size: 36px; font-weight: 300;">${car.brand}</h4>
                <h1 style="font-size: 86px;">${car.model}</h1>
                <div class="model-items-sub" style="margin-top: 50px;">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Price</p>
                        <h4 class="model-price">${car.price}</h4>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Max Speed</p>
                        <h4 class="model-speed">${car.max_speed}</h4>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Power</p>
                        <h4 class="model-power">${car.power}</h4>
                    </div>
                </div>
            </div>
            <img src="${car.image}" class="model-image" />
        </div>
        
        <div class="model-child-content">
            <div class="model-child-image">
                <img src="${car.image_overview}" class="model-child-image" width="100"/>
            </div>
            
            <div class="model-child-text">
                <h1>OVERVIEW</h1>
                <p>${car.overview}</p>
            </div>
        </div>

        <div class="model-child-content">
            <div class="model-child-engine">
                <h1>ENGINE</h1>
                <p>${car.engine}</p>
            </div>
            <div class="model-child-engine-img">
                <img src="${car.image_engine}" class="model-child-image" width="100"/>
            </div>
        </div>

        <div class="model-child-layout">
            <div class="model-child-layout-image">
                <img src="${car.image_interior}" />
            </div>
            <div class="model-child-layout-image" style="position: absolute; right: 0;">
                <img src="${car.image_exterior}" />
            </div>
        </div>

        <div class="model-child-desc">
            <div>
                <h1>INTERIOR</h1>
                <p>${car.interior}</p>
            </div>
            <div>
                <h1>EXTERIOR</h1>
                <p>${car.exterior}</p>
            </div>
        </div>

        <h1 style="text-align: center; margin-bottom: 40px;">SPECIFICATIONS</h1>

        <div class="model-table-container">
            <table class="model-table">
                <tr>
                    <td><h4>MAX POWER</h4></td>
                    <td style="text-align: end;"><p>${car.power}</p></td>
                </tr>
                <tr>
                    <td><h4>TOP SPEED</h4></td>
                    <td style="text-align: end;"><p>${car.max_speed}</p></td>
                </tr>
                <tr>
                    <td><h4>ACCELERATION</h4></td>
                    <td style="text-align: end;"><p>${car.acceleration}</p></td>
                </tr>
                <tr>
                    <td><h4>POWER CONSUMPTION</h4></td>
                    <td style="text-align: end;"><p>${car.power_consumption}</p></td>
                </tr>
                <tr>
                    <td><h4>PRICE</h4></td>
                    <td style="text-align: end;"><p>${car.price}</p></td>
                </tr>
            </table>
        </div>

        <div style="display: flex; justify-content: center; align-items: center;">
            <button id="checkout-button" class="checkout-button">Checkout</button>  
        </div>

        <div class="comment-wrapper">
            <p>Jumlah like: ${car.like}</p>
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
            <h1>Comments ${car.comment.length}</h1>
            ${car.comment.map(comment => `
                <div class="comment-container">
                    <div class="comment-image">
                        <img src="${comment.image}"/>
                    </div>
                    <div class="comment-display">
                        <div class="comment-display-header">
                            <h2>${comment.name}</h2>
                            <p>Bintang ${comment.score}</p>
                            <p>${comment.createdAt}</p>
                        </div>
                        <p>${comment.message}</p>
                    </div>
                </div>
            `).join("")
            }
        </div>
    `;
        const starImages = contentDiv.querySelectorAll(".comment-input-star img");
        starImages.forEach((img) => {
            img.addEventListener("click", function () {
                handleRating(img);
            });
        });

        modelContainer.appendChild(contentDiv);

        document.getElementById("checkout-button").addEventListener("click", () => {
            window.location.href = `/checkout/${car._id}`
        })

        document.getElementById("comment-form").addEventListener("submit", async(event) => {
            try {
                event.preventDefault();
                const userId = localStorage.getItem("id");
                const responseUser = await fetch(`/api/user/${userId}`);
                if (!responseUser.ok) throw new Error('Failed to fetch user data');

                const user = await responseUser.json();
                
                const name = user.username
                const image = user.image
                const score = parseInt(document.getElementById("comment-score").value);
                const message = document.getElementById("comment-message").value;

                const carId = getCarId();

                const responseComment = await fetch(`/api/cars/${carId}/comment`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ name, image, score, message })
                });

                if (responseComment.ok){
                    alert('Comment added!');
                    document.getElementById('comment-form').reset();
                } else {
                    throw new Error('Failed to add comment data');
                }
            } catch(error) {
                console.log(error)
            }
            
        })

    } catch (error) {
        console.log(error)
    }

}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
});





