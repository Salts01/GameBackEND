const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");


// Verifica se existe token
if (!token) {

    window.location.href = "./login.html";

}


// Decodifica o payload do JWT
function decodificarJWT(token) {

    try {

        const payload = token.split(".")[1];

        const payloadBase64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(payloadBase64)
                .split("")
                .map(function(c) {
                    return "%" +
                        ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        return JSON.parse(jsonPayload);

    } catch (error) {

        console.error("Erro ao decodificar JWT:", error);
        return null;

    }

}


const usuario = decodificarJWT(token);

console.log("Usuário:", usuario);


if (!usuario) {

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    window.location.href = "./login.html";

} else {

    document.getElementById("nome").textContent =
        usuario.nome;

    document.getElementById("email").textContent =
        usuario.email;

    document.getElementById("level").textContent =
        usuario.level;

}


// Logout
document
    .getElementById("logout")
    .addEventListener("click", function() {

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.href = "./login.html";

    });