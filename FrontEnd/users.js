const API = "http://localhost:8000";


// ======================================================
// PEGAR TOKEN
// ======================================================

function getToken() {

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "./login.html";
        return null;

    }

    return token;

}


// ======================================================
// LISTAR USUÁRIOS
// ======================================================

async function carregarUsuarios() {

    const token = getToken();

    if (!token) return;

    try {

        const resposta = await fetch(
            `${API}/admin/Users?token=${encodeURIComponent(token)}`
        );

        const usuarios = await resposta.json();

        console.log("Usuários:", usuarios);

        // Caso a API retorne uma mensagem
        if (!Array.isArray(usuarios)) {

            alert(usuarios);
            return;

        }

        const tabela =
            document.getElementById("listaUsuarios");

        tabela.innerHTML = "";

        usuarios.forEach(user => {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${user.Nome}</td>
                <td>${user.Email}</td>
                <td>${user.Nivel}</td>
                <td>${user.Ativo ? "Ativo" : "Desativado"}</td>

                <td>
                    <button onclick="alterarUsuario('${user.Email}')">
                        Alterar
                    </button>
                </td>
            `;

            tabela.appendChild(linha);

        });

    } catch (error) {

        console.error(error);

        alert("Erro ao carregar usuários.");

    }

}


// ======================================================
// CRIAR USUÁRIO
// ======================================================

async function criarUsuario() {

    const token = getToken();

    if (!token) return;


    const nome =
        document.getElementById("nomeNovo").value;

    const email =
        document.getElementById("emailNovo").value;

    const password =
        document.getElementById("senhaNova").value;

    const level =
        document.getElementById("nivelNovo").value;


    try {

        const resposta = await fetch(
            `${API}/admin/criarUser` +
            `?nome=${encodeURIComponent(nome)}` +
            `&email=${encodeURIComponent(email)}` +
            `&password=${encodeURIComponent(password)}` +
            `&level=${encodeURIComponent(level)}` +
            `&token=${encodeURIComponent(token)}`,
            {
                method: "POST"
            }
        );


        const resultado = await resposta.json();

        console.log("Resultado:", resultado);

        alert(JSON.stringify(resultado));


        carregarUsuarios();

    } catch (error) {

        console.error(error);

        alert("Erro ao criar usuário.");

    }

}


// ======================================================
// ALTERAR USUÁRIO
// ======================================================

async function alterarUsuario(email) {

    const token = getToken();

    if (!token) return;


    const password = prompt("Nova senha:");

    if (password === null) return;


    const level = prompt("Novo nível:");

    if (level === null) return;


    const ativo = confirm("Usuário ativo?");


    try {

        const resposta = await fetch(
            `${API}/admin/alteraUser` +
            `?email=${encodeURIComponent(email)}` +
            `&password=${encodeURIComponent(password)}` +
            `&level=${encodeURIComponent(level)}` +
            `&ativo=${ativo}` +
            `&token=${encodeURIComponent(token)}`,
            {
                method: "POST"
            }
        );


        const resultado = await resposta.json();

        console.log("Resultado:", resultado);

        alert(JSON.stringify(resultado));


        carregarUsuarios();

    } catch (error) {

        console.error(error);

        alert("Erro ao alterar usuário.");

    }

}


// ======================================================
// INICIALIZA
// ======================================================

carregarUsuarios();