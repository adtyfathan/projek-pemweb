const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

const profileContainer = document.getElementById("profile-data-wrapper");
const userId = localStorage.getItem("id");

window.onload = async() => {
    document.getElementById("profile-data").classList.add("profile-active");

    try {
        const responseUser = await fetch(`/api/user/${userId}`);
        if (!responseUser.ok) throw new Error('Failed to fetch user data');
        const user = await responseUser.json();
        
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("profile-data-container");
        contentDiv.innerHTML = `
            <img src="/images/banner.jpg" class="profile-data-banner"/>
            <div class="profile-data-content">
                <form id="profile-form">
                    <img src="${user.image}" class="profile-data-pp"/>
                    <div class="profile-data-header">
                        <h1>Hello ${user.username}!</h1>
                        <input type="submit" value="Save" class="profile-button"/>
                    </div>

                    <div class="profile-data-row">
                        <label>Username</label>
                        <input id="profile-username" type="text" value="${user.username}" placeholder="username" required/>
                    </div>

                    <div class="profile-data-row">
                        <label>Address</label>
                        <input id="profile-address" type="text" value="${(user.address === null) ? "" : user.address}" placeholder="address" required/>
                    </div>

                    <div class="profile-data-row">
                        <label>Country</label>
                        <input id="profile-country" type="text" value="${(user.country === null) ? "" : user.country}" placeholder="country" required/>
                    </div>

                    <div class="profile-data-row">
                        <label>Region</label>
                        <input id="profile-region" type="text" value="${(user.region === null) ? "" : user.region}" placeholder="region" required/>
                    </div>

                    <div class="profile-data-row">
                        <label>City</label>
                        <input id="profile-city" type="text" value="${(user.city === null) ? "" : user.city}" placeholder="city" required/>
                    </div>

                    <div class="profile-data-row">
                        <label>Postal Code</label>
                        <input id="profile-postal-code" type="number" value="${(user.postal_code === null) ? "" : user.postal_code}" placeholder="postal code" required/>
                    </div>

                    <div class="profile-data-row">
                        <label>Phone Number</label>
                        <input id="profile-phone-number" type="number" value="${(user.phone_number === null) ? "" : user.phone_number}" placeholder="phone number" required/>
                    </div>
                </form>
            </div>
        `;
        
        profileContainer.appendChild(contentDiv);

        const profileForm = document.getElementById("profile-form");
        profileForm.addEventListener("submit", async(event) => {
            event.preventDefault();

            const username = document.getElementById("profile-username").value;
            const address = document.getElementById("profile-address").value;
            const country = document.getElementById("profile-country").value;
            const region = document.getElementById("profile-region").value;
            const city = document.getElementById("profile-city").value;
            const postal_code = parseInt(document.getElementById("profile-postal-code").value);
            const phone_number = parseInt(document.getElementById("profile-phone-number").value);
            
            try {
                const responseUpdate = await fetch("/api/user/update-profile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, username, address, country, region, city, postal_code, phone_number })
                });
                if(responseUpdate.ok){
                    alert("Profile data changed!");
                    window.location.reload();
                } else {
                    throw new Error("Failed to update profile");
                }
            } catch(error){
                console.log(error);
            }
        });
    } catch(error){
        console.error(error);
    }
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});