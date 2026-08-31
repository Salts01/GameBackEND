const API = "http://localhost:8000";


// ======================================================
// TOKEN
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
// LISTAR JOGOS
// ======================================================

async function carregarGames() {

    const token = getToken();

    if (!token) return;


    try {

        const resposta = await fetch(
            `${API}/game/Visualizador?token=${encodeURIComponent(token)}`
        );


        const games = await resposta.json();

        console.log("Jogos:", games);


        if (!Array.isArray(games)) {

            alert(games);
            return;

        }


        const tabela =
            document.getElementById("listaGames");

        tabela.innerHTML = "";


        games.forEach(game => {

            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>${game.Id}</td>

                <td>${game.Nome}</td>

                <td>${game.Rating}</td>

                <td>
                    ${game.Privado ? "Privado" : "Público"}
                </td>

                <td>

                    <button
                        onclick="alterarGame(${game.Id})">
                        Alterar
                    </button>

                    <button
                        onclick="deletarGame(${game.Id})">
                        Excluir
                    </button>

                </td>

            `;


            tabela.appendChild(linha);

        });


    } catch (error) {

        console.error(error);

        alert("Erro ao carregar jogos.");

    }

}


// ======================================================
// PUBLICAR JOGO
// ======================================================

async function publicarGame() {

    const token = getToken();

    if (!token) return;


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


        console.log("Resultado:", resultado);

        alert(JSON.stringify(resultado));


        carregarGames();


    } catch (error) {

        console.error(error);

        alert("Erro ao publicar jogo.");

    }

}


// ======================================================
// ALTERAR JOGO
// ======================================================

async function alterarGame(id) {

    const token = getToken();

    if (!token) return;


    const rating =
        prompt("Novo rating:");


    if (rating === null) return;


    const privado =
        confirm("O jogo será privado?");


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


        console.log("Resultado:", resultado);

        alert(JSON.stringify(resultado));


        carregarGames();


    } catch (error) {

        console.error(error);

        alert("Erro ao alterar jogo.");

    }

}


// ======================================================
// DELETAR JOGO
// ======================================================

async function deletarGame(id) {

    const token = getToken();

    if (!token) return;


    const confirmar =
        confirm(
            `Deseja realmente excluir o jogo ${id}?`
        );


    if (!confirmar) return;


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


        console.log("Resultado:", resultado);

        alert(JSON.stringify(resultado));


        carregarGames();


    } catch (error) {

        console.error(error);

        alert("Erro ao excluir jogo.");

    }

}


// ======================================================
// INICIALIZA
// ======================================================

carregarGames();