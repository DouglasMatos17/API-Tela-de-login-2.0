import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDz4EXt3l7EOpopuhhlNZ6ZsI0J5k0sTbk",
    authDomain: "tela-de-login--2.firebaseapp.com",
    databaseURL: "https://tela-de-login--2-default-rtdb.firebaseio.com",
    projectId: "tela-de-login--2",
    storageBucket: "tela-de-login--2.appspot.com",
    messagingSenderId: "224401762261",
    appId: "1:224401762261:web:c4cd0fd0017b4ba5a07f5c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const usersRef = ref(db, "users")



// Manipulação de dados

//Imports e Exports
import { usuario } from './script.js'
import { alertLoginOk } from './script.js'
export { iniciarBG } // Gatilho para iniciar procedimentos no banco de dados
export { efetuarLogin } //

let userID


function efetuarLogin() {
    let userLogin = document.getElementById('userLog').value
    let passwordLogin = document.getElementById('passwordLog').value

    validarlogin(userLogin, passwordLogin)
        .then(loginBemSucedido => {
            if (loginBemSucedido) {
                alertLoginOk(true)
                console.log('Usuário autenticado com sucesso!');
            } else {
                console.log('Falha na autenticação. Verifique suas credenciais.')
            }
        })
        .catch(error => {
            console.error('Erro ao realizar o login:', error.message)
        });
}

// Função que faz a validação do login e senha do usuario
function validarlogin(login, senha) {
    return get(usersRef)
        .then(snapshot => {
            // Verifica se o login e a senha correspondem a algum usuário
            let loginBemSucedido = false;
            snapshot.forEach(childSnapshot => {
                const userIDBD = childSnapshot.key;
                const loginBD = childSnapshot.child('name').val()
                const senhaBD = childSnapshot.child('senha').val()

                // Verifica se loginBD e senhaBD não são null ou undefined antes de comparar
                if (loginBD && senhaBD && login === loginBD && senha === senhaBD) {
                    console.log('Login bem-sucedido')
                    loginBemSucedido = true
                }
            })

            return loginBemSucedido;
        })
        .catch(error => {
            console.error('Erro ao realizar o login:', error.message)
            return false
        });
}


//Start
function iniciarBG() {
    console.log('Banco de dados iniciado')
    buscarlista()
}

// Função que captura a quantiodade de usuarios cadastrados no Banco de dados
function buscarlista(){
get(usersRef)
    .then((snapshot) => { 
    if (snapshot.exists()) {
        const data = snapshot.val();
        const numberOfUsers = data ? Object.keys(data).length : 0
        criadorID(numberOfUsers)
    } else {
        console.log("Erro ao acessar usuarios no banco de dados")
    }
    })
    .catch((error) => {
    console.error("Erro ao obter dados da coleção 'users':", error)
    });
}

// função que usa o numero de de usuarios cadastrados para gerar um ID
function criadorID(numberOfUsers){
    
    numberOfUsers += 1

    userID = String(numberOfUsers).padStart(6, '0')
    const nomeUser = usuario.login
    const emailUser = usuario.email
    const senhaUser = usuario.senha
    criadorUser(userID, nomeUser, emailUser, senhaUser)
}

//função que cria o objeto usuario usando o ID.
function criadorUser(userID, nomeUser, emailUser, senhaUser) {
    set(ref(db, 'users/' + userID), {
        name: nomeUser,
        email: emailUser,
        senha: senhaUser
    });
}