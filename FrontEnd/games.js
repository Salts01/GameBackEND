const API = "http://localhost:8000";

const token = localStorage.getItem("token");


if (!token) {

    window.location.href = "./login.html";

}


// ============================
// DECODIFICAR TOKEN
// ============================

function decodificarToken(token) {

    try {

        const payload = token.split(".")[1];

        const base64 =
            payload
                .replace(/-/g, "+")
                .replace(/_/g, "/");

        return JSON.parse(
            decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function(char) {

                        return "%" +
                            ("00" +
                            char.charCodeAt(0).toString(16))
                            .slice(-2);

                    })
                    .join("")
            )
        );

    } catch (error) {

        console.error(error);

        localStorage.removeItem("token");

        window.location.href = "./login.html";

    }

}


const usuario =
    decodificarToken(token);


console.log("Usuário:", usuario);


// ============================
// LISTAR JOGOS
// ============================

async function carregarGames() {

    try {

        const resposta = await fetch(

            `${API}/game/Visualizador` +

            `?token=${encodeURIComponent(token)}`

        );


        const games =
            await resposta.json();


        console.log("Games:", games);


        if (!resposta.ok) {

            alert(JSON.stringify(games));

            return;

        }


        const tabela =
            document.getElementById("listaGames");


        tabela.innerHTML = "";


        games.forEach(game => {

            const linha =
                document.createElement("tr");


            let botoes = "";


            // Level 1 e 2 podem alterar/deletar
            if (usuario.level <= 2) {

                botoes = `

                    <button
                        onclick="alterarGame(${game.Id})">
                        Alterar
                    </button>

                    <button
                        onclick="deletarGame(${game.Id})">
                        Deletar
                    </button>

                `;

            }


            linha.innerHTML = `

                <td>${game.Id}</td>

                <td>${game.Nome}</td>

                <td>${game.Rating}</td>

                <td>${game.Privado}</td>

                <td>${botoes}</td>

            `;


            tabela.appendChild(linha);

        });


    } catch (error) {

        console.error(error);

        alert("Erro ao carregar jogos.");

    }

}


// ============================
// PUBLICAR JOGO
// ============================

async function publicarGame() {

    const nome =
        document.getElementById("nomeGame").value;

    const rating =
        document.getElementById("ratingGame").value;

    const privado =
        document.getElementById("privadoGame").checked;


    try {

        const resposta = await fetch(

            `${API}/game/PublicarJogo` +

            `?nome=${encodeURIComponent(nome)}` +

            `&aval=${encodeURIComponent(rating)}` +

            `&privado=${privado}` +

            `&token=${encodeURIComponent(token)}`,

            {
                method: "POST"
            }

        );


        const resultado =
            await resposta.json();


        alert(JSON.stringify(resultado));


        carregarGames();

    } catch (error) {

        console.error(error);

        alert("Erro ao publicar jogo.");

    }

}


// ============================
// ALTERAR JOGO
// ============================

async function alterarGame(id) {

    const rating =
        prompt("Novo rating:");


    if (rating === null) {
        return;
    }


    const privado =
        confirm("O jogo deve ser privado?");


    try {

        const resposta = await fetch(

            `${API}/game/AlteraGame` +

            `?identification=${encodeURIComponent(id)}` +

            `&rating=${encodeURIComponent(rating)}` +

            `&privado=${privado}` +

            `&token=${encodeURIComponent(token)}`,

            {
                method: "POST"
            }

        );


        const resultado =
            await resposta.json();


        alert(JSON.stringify(resultado));


        carregarGames();

    } catch (error) {

        console.error(error);

        alert("Erro ao alterar jogo.");

    }

}


// ============================
// DELETAR JOGO
// ============================

async function deletarGame(id) {

    const confirmar =
        confirm(
            `Deseja realmente excluir o jogo ${id}?`
        );


    if (!confirmar) {
        return;
    }


    try {

        const resposta = await fetch(

            `${API}/game/deletaJogo` +

            `?identification=${encodeURIComponent(id)}` +

            `&token=${encodeURIComponent(token)}`,

            {
                method: "POST"
            }

        );


        const resultado =
            await resposta.json();


        alert(JSON.stringify(resultado));


        carregarGames();

    } catch (error) {

        console.error(error);

        alert("Erro ao deletar jogo.");

    }

}


// ============================
// CONTROLE DA INTERFACE
// ============================

// Level 1 e 2 podem publicar
if (usuario.level > 2) {

    document.getElementById(
        "areaPublicar"
    ).style.display = "none";

}


carregarGames();