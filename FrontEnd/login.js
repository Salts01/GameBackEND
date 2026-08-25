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

        console.log("Token recebido:", data);

        if (response.ok && typeof data === "string") {

            // Salva o JWT
            localStorage.setItem("token", data);

            console.log("Token salvo:", localStorage.getItem("token"));

            window.location.href = "./dashboard.html";

        } else {

            mensagem.textContent =
                typeof data === "string"
                    ? data
                    : "Email ou senha incorretos.";

        }

    } catch (error) {

        mensagem.textContent =
            "Erro ao conectar com o servidor.";

        console.error(error);
    }

});