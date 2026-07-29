const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            `http://localhost:8000/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        );

        const data = await response.json();

        console.log("Resposta da API:", data);

        if (data.loggin === true) {

            console.log("Login realizado!");

            const usuario = JSON.stringify(data.usuario);

            console.log("Dados que serão salvos:", usuario);

            localStorage.setItem(
                "usuario",
                usuario
            );

            console.log(
                "Dados salvos no localStorage:",
                localStorage.getItem("usuario")
            );

            window.location.href = "dashboard.html";

        }

    } catch (error) {

        mensagem.textContent =
            "Erro ao conectar com o servidor.";

        console.error(error);
    }

});