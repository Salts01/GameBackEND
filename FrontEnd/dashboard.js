const usuario = JSON.parse(
    localStorage.getItem("usuario")
);


if(!usuario){

    window.location.href="login.html";

}


document.getElementById("nome").textContent =
    usuario.nome;


document.getElementById("email").textContent =
    usuario.email;


document.getElementById("nivel").textContent =
    usuario.level;



function abrirUsuarios(){

    window.location.href="./users.html";

}


function abrirJogos(){

    window.location.href="./games.html";

}



document
.getElementById("logout")
.addEventListener("click",()=>{

    localStorage.removeItem("usuario");

    window.location.href="./login.html";

});
