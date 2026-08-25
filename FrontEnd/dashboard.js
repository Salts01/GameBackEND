const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "./login.html";

}


// Decodifica o payload do JWT
function decodificarToken(token) {

    try {

        const payload = token.split(".")[1];

        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const jsonPayload =
            decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function(char) {
                        return "%" +
                            ("00" + char.charCodeAt(0).toString(16))
                            .slice(-2);
                    })
                    .join("")
            );

        return JSON.parse(jsonPayload);

    } catch (error) {

        console.error("Token inválido:", error);

        localStorage.removeItem("token");

        window.location.href = "./login.html";
    }
}


const usuario = decodificarToken(token);

console.log("Usuário:", usuario);


// Preenche informações
document.getElementById("nome").textContent =
    usuario.nome;

document.getElementById("email").textContent =
    usuario.email;

document.getElementById("level").textContent =
    usuario.level;


// Controle dos menus
const usuariosMenu =
    document.getElementById("usuariosMenu");

const jogosMenu =
    document.getElementById("jogosMenu");


// Level 1 pode administrar usuários
if (usuario.level !== 1) {

    usuariosMenu.style.display = "none";

}


// Level 1, 2 e 3 podem acessar jogos
if (usuario.level > 3) {

    jogosMenu.style.display = "none";

}


// Logout
document
    .getElementById("logout")
    .addEventListener("click", function() {

        localStorage.removeItem("token");

        window.location.href = "./login.html";

    });