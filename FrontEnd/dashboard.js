const usuarioJSON = localStorage.getItem("usuario");

console.log("Valor encontrado no localStorage:", usuarioJSON);

if (!usuarioJSON) {

    console.log("Nenhum usuário encontrado.");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 5000);

} else {

    const usuario = JSON.parse(usuarioJSON);

    console.log("Usuário armazenado:", usuario);

    document.getElementById("nome").textContent =
        usuario.nome;

    document.getElementById("email").textContent =
        usuario.email;

    document.getElementById("level").textContent =
        usuario.level;
}

// Botão de logout
document
.getElementById("logout")
.addEventListener("click", function() {


    // Remove o usuário armazenado
    localStorage.removeItem("usuario");

    // Volta para a página de login
    window.location.href = "login.html";

});

