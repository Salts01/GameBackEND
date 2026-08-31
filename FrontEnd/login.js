const API = "http://localhost:8000";

const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            `${API}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        );

        const data = await response.json();

        console.log("Resposta da API:", data);

        if (response.ok && Array.isArray(data) && data.length === 2) {

            const token = data[0];
            const refreshToken = data[1];

            console.log("Login realizado!");
            console.log("Token recebido");

            // Salva os tokens
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);

            // Vai para o dashboard
            window.location.href = "./dashboard.html";

        } else {

            mensagem.textContent =
                "Email ou senha incorretos.";

        }

    } catch (error) {

        mensagem.textContent =
            "Erro ao conectar com o servidor.";

        console.error(error);
    }

});