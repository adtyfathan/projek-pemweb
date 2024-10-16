const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getCarId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

window.onload = async function () {
    const carId = getCarId();

    try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) throw new Error('Failed to fetch car data');

        const car = await response.json();

        console.log(car)
    } catch (error) {
        console.log(error)
    }
}