// import { getCars } from "./controllers/carController.js";

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

async function fecthCars() {
    try {
        const response = await fetch("http://localhost:3000/api/cars");
        const data = await response.json();
        const a = document.getElementById("a");
        a.innerHTML = data.map(item => `<p>${item.model}</p>`).join("");
    } catch (error) {
        console.log(error);
    }
}

fecthCars();

document.getElementById("x").addEventListener("submit", async (event) => {
    event.preventDefault();
    let brand = document.getElementById("brand").value
    let model = document.getElementById("model").value
    let power = document.getElementById("power").value
    let max_speed = document.getElementById("max_speed").value
    let acceleration = document.getElementById("acceleration").value
    let image = document.getElementById("image").value
    let image_overview = document.getElementById("image_overview").value
    let image_engine = document.getElementById("image_engine").value
    let image_interior = document.getElementById("image_interior").value
    let image_exterior = document.getElementById("image_exterior").value
    let description = document.getElementById("description").value
    let power_consumption = document.getElementById("power_consumption").value
    let price = document.getElementById("price").value
    let overview = document.getElementById("overview").value
    try {
        const response = await fetch("http://localhost:3000/api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ brand, model, power, max_speed, acceleration, image, image_overview, image_engine, image_interior, image_exterior, description, power_consumption, price, overview })
        });
        const result = await response.json();
        if (response.ok) {
            alert("created");
            console.log(result)
        } else {
            alert("error");
        }
    } catch (error) {
        console.log(error);
    }
})

document.getElementById("y").addEventListener("submit", async (event) => {
    event.preventDefault();
    let title = document.getElementById("title").value
    let description = document.getElementById("description2").value
    let date = document.getElementById("date").value
    let image = document.getElementById("image2").value

    try {
        const response = await fetch("http://localhost:3000/api/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, date, image })
        });
        const result = await response.json();
        if (response.ok) {
            alert("created");
            console.log(result)
        } else {
            alert("error");
        }
    } catch (error) {
        console.log(error)
    }
})