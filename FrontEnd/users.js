const API = "http://localhost:8000";



// ==========================
// CARREGAR USUÁRIOS
// ==========================

async function carregarUsuarios(){


    const resposta = await fetch(
        `${API}/admin/Users`
    );


    const usuarios = await resposta.json();


    const tabela =
    document.getElementById("listaUsuarios");


    // limpa tabela antes de carregar
    tabela.innerHTML = "";



    usuarios.forEach(user => {


        let linha =
        document.createElement("tr");



        linha.innerHTML = `

        <td>${user.Nome}</td>

        <td>${user.Email}</td>

        <td>${user.Nivel}</td>

        <td>${user.Ativo}</td>


        <td>

            <button onclick="
            alterarUsuario('${user.Email}')
            ">
                Alterar
            </button>


        </td>

        `;



        tabela.appendChild(linha);



    });


}





// ==========================
// CRIAR USUÁRIO
// ==========================


async function criarUsuario(){


    const nome =
    document.getElementById("nomeNovo").value;


    const email =
    document.getElementById("emailNovo").value;


    const password =
    document.getElementById("senhaNova").value;


    const level =
    document.getElementById("nivelNovo").value;



    const resposta =
    await fetch(

        `${API}/admin/criarUser?`+
        `nome=${encodeURIComponent(nome)}`+
        `&email=${encodeURIComponent(email)}`+
        `&password=${encodeURIComponent(password)}`+
        `&level=${level}`,

        {

            method:"POST"

        }

    );



    const resultado =
    await resposta.json();



    alert(
        JSON.stringify(resultado)
    );



    carregarUsuarios();


}





// ==========================
// ALTERAR USUÁRIO
// ==========================


async function alterarUsuario(email){



    let password =
    prompt(
        "Nova senha:"
    );



    if(password === null){

        return;

    }




    let level =
    prompt(
        "Novo nível (1-4):"
    );



    if(level === null){

        return;

    }




    let ativo =
    confirm(
        "Usuário ficará ativo?"
    );





    const resposta =
    await fetch(

        `${API}/admin/alteraUser?`+

        `email=${encodeURIComponent(email)}`+

        `&password=${encodeURIComponent(password)}`+

        `&level=${level}`+

        `&ativo=${ativo}`,

        {

            method:"POST"

        }

    );




    const resultado =
    await resposta.json();



    alert(
        JSON.stringify(resultado)
    );



    carregarUsuarios();


}






// ==========================
// VOLTAR
// ==========================


function voltarDashboard(){

    window.location.href =
    "dashboard.html";

}





// inicia página

carregarUsuarios();
