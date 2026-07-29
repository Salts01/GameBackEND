const API = "http://localhost:8000";



// =================================
// CARREGAR JOGOS
// =================================


async function carregarGames(){


    const resposta =
    await fetch(
        `${API}/game/Visualizador`
    );



    const games =
    await resposta.json();



    const tabela =
    document.getElementById("listaGames");



    // limpa tabela antes de carregar novamente

    tabela.innerHTML = "";




    games.forEach(game => {



        let linha =
        document.createElement("tr");




        linha.innerHTML = `


        <td>
            ${game.Id}
        </td>


        <td>
            ${game.Nome}
        </td>


        <td>
            ${game.Rating}
        </td>


        <td>
            ${game.Privado}
        </td>



        <td>


            <button onclick="
            alterarGame(${game.Id})
            ">

                Alterar

            </button>



            <button onclick="
            deletarGame(${game.Id})
            ">

                Excluir

            </button>



        </td>



        `;



        tabela.appendChild(linha);



    });



}






// =================================
// PUBLICAR JOGO
// =================================


async function publicarGame(){



    const nome =
    document.getElementById("nomeGame").value;



    const rating =
    document.getElementById("ratingGame").value;



    const privado =
    document.getElementById("privadoGame").value;





    const resposta =
    await fetch(

        `${API}/game/PublicarJogo?`+

        `nome=${encodeURIComponent(nome)}`+

        `&aval=${rating}`+

        `&privado=${privado}`,

        {

            method:"POST"

        }

    );





    const resultado =
    await resposta.json();



    alert(
        JSON.stringify(resultado)
    );



    carregarGames();



}







// =================================
// ALTERAR JOGO
// =================================


async function alterarGame(id){



    let rating =
    prompt(
        "Novo rating:"
    );



    if(rating === null){

        return;

    }




    let privado =
    confirm(
        "O jogo será privado?"
    );






    const resposta =
    await fetch(


        `${API}/game/AlteraGame?`+

        `identification=${id}`+

        `&rating=${rating}`+

        `&privado=${privado}`,

        {

            method:"POST"

        }


    );





    const resultado =
    await resposta.json();




    alert(
        JSON.stringify(resultado)
    );




    carregarGames();



}








// =================================
// DELETAR JOGO
// =================================


async function deletarGame(id){



    let confirmar =
    confirm(
        "Deseja realmente excluir esse jogo?"
    );




    if(!confirmar){

        return;

    }





    const resposta =
    await fetch(


        `${API}/game/deletaJogo?`+

        `identification=${id}`,

        {

            method:"POST"

        }


    );






    const resultado =
    await resposta.json();




    alert(
        JSON.stringify(resultado)
    );



    carregarGames();



}






// =================================
// VOLTAR
// =================================


function voltarDashboard(){


    window.location.href =
    "dashboard.html";


}





// Carrega ao abrir a página

carregarGames();
