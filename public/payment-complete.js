const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}

function getTransactionId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

const transactionId = getTransactionId();

window.onload = function(){
    document.getElementById("complete-header").textContent = `#${transactionId}`;

    let countdown = 10;
    const countdownNum = document.getElementById("complete-redirect");

    const interval = setInterval(() => {
        countdownNum.textContent = `You will redirected to Homepage in ${countdown}`;
        countdown--;

        if (countdown < 0) {
            clearInterval(interval); 
            window.location.href = '/'; 
        }
    }, 1000)
}

document.getElementById("button-logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
});