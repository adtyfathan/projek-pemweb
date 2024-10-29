const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/login";
}


window.onload = async function() {
    const user = localStorage.getItem("user");

    console.log(user)

    console.log(user.password)

}