const API = "http://localhost:8000";

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "./login.html";

}


// ============================
// LISTAR USUÁRIOS
// ============================

async function carregarUsuarios() {

    try {

        const resposta = await fetch(
            `${API}/admin/Users?token=${encodeURIComponent(token)}`
        );

        const usuarios = await resposta.json();

        console.log("Usuários:", usuarios);

        if (!resposta.ok) {

            alert(JSON.stringify(usuarios));

            return;
        }

        const tabela =
            document.getElementById("listaUsuarios");

        tabela.innerHTML = "";

        usuarios.forEach(user => {

            const linha =
                document.createElement("tr");

            linha.innerHTML = `

                <td>${user.Nome}</td>

                <td>${user.Email}</td>

                <td>${user.Nivel}</td>

                <td>${user.Ativo}</td>

                <td>

                    <button
                        onclick="alterarUsuario('${user.Email}')">
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


// ============================
// CRIAR USUÁRIO
// ============================

async function criarUsuario() {

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


        const resultado =
            await resposta.json();

        alert(JSON.stringify(resultado));

        carregarUsuarios();

    } catch (error) {

        console.error(error);

        alert("Erro ao criar usuário.");

    }

}


// ============================
// ALTERAR USUÁRIO
// ============================

async function alterarUsuario(email) {

    const password =
        prompt("Nova senha:");

    if (password === null) {
        return;
    }


    const level =
        prompt("Novo nível (1-4):");

    if (level === null) {
        return;
    }


    const ativo =
        confirm("Usuário ativo?");


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


        const resultado =
            await resposta.json();


        alert(JSON.stringify(resultado));

        carregarUsuarios();

    } catch (error) {

        console.error(error);

        alert("Erro ao alterar usuário.");

    }

}


carregarUsuarios();