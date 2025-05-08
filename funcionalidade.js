/*  -- código conectado com o back e banco de dados. 

document.addEventListener("DOMContentLoaded", function () {

    // --- LOGIN ---
    const formLogin = document.getElementById("login-form");
    const botaoLogin = document.getElementById("botao-login");

    if (formLogin && botaoLogin) {
        botaoLogin.addEventListener("click", function (event) {
            event.preventDefault();
            formLogin.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        formLogin.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            if (!email || !senha) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            const dadosLogin = { email, senha };

            try {
                const resposta = await fetch("http://localhost:8080/usuarios/login", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosLogin)
                });

                const resultado = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(resultado.erro || "Erro ao realizar login!");
                }

                console.log("Login realizado com sucesso:", resultado);
                alert("Login realizado com sucesso!");
                window.location.href = "html/agendarHorasPet.html";

            } catch (erro) {
                if (erro.message.includes("Usuário ou senha inválidos")) {
                    console.warn("Tentativa de login falhou: " + erro.message);
                } else {
                    console.error("Erro inesperado ao conectar com o backend:", erro.message);
                }
                alert(erro.message);
            }
        });
    }

    // --- CADASTRO ---
    const formCadastro = document.getElementById("cadastro-form");

    if (formCadastro) {
        formCadastro.addEventListener("submit", async function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const telefone = document.getElementById("telefone").value;
            const senha = document.getElementById("senha").value;

            if (!nome || !email || !telefone || !senha) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            const dadosCadastro = { nome, email, telefone, senha };

            try {
                const resposta = await fetch("http://localhost:8080/usuarios", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosCadastro)
                });

                const resultado = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(resultado.erro || "Erro ao realizar cadastro!");
                }

                console.log("Cadastro realizado com sucesso:", resultado);
                alert("Cadastro realizado com sucesso!");
                window.location.href = "../index.html"; // Redireciona para login

            } catch (erro) {
                console.error("Erro ao cadastrar:", erro.message);
                alert(erro.message);
            }
        });
    }
});

*/

/* 
    -- LOGO ABAIXO EU IREI COLOCAR O CÓDIGO QUE IRÁ SER USADO PARA TESTES. 
*/

document.addEventListener("DOMContentLoaded", function () {

    // --- LOGIN MOCKADO PARA TESTES ---
    const USUARIO_TESTE = "teste@exemplo.com";
    const SENHA_TESTE = "123456";

    // --- LOGIN ---
    const formLogin = document.getElementById("login-form");
    const botaoLogin = document.getElementById("botao-login");

    if (formLogin && botaoLogin) {
        botaoLogin.addEventListener("click", function (event) {
            event.preventDefault();
            formLogin.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        formLogin.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            if (!email || !senha) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            // --- LOGIN MOCKADO PARA TESTES (SEM BACKEND) ---
            if (email === USUARIO_TESTE && senha === SENHA_TESTE) {
                alert("Login de teste realizado com sucesso!");
                console.log("Login simulado com sucesso para:", email);
                window.location.href = "agendarHorasPet.html";
                return;
            } else {
                alert("Usuário de teste inválido!\nUse:\nEmail: teste@exemplo.com\nSenha: 123456");
                return;
            }

            // --- CÓDIGO REAL (DESCOMENTAR QUANDO O BACKEND ESTIVER ONLINE) ---
            /*
            const dadosLogin = { email, senha };

            try {
                const resposta = await fetch("http://localhost:8080/usuarios/login", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosLogin)
                });

                const resultado = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(resultado.erro || "Erro ao realizar login!");
                }

                console.log("Login realizado com sucesso:", resultado);
                alert("Login realizado com sucesso!");
                window.location.href = "html/agendarHorasPet.html";

            } catch (erro) {
                console.error("Erro inesperado ao conectar com o backend:", erro.message);
                alert("Erro ao conectar com o servidor. Verifique se o backend está online.");
            }
            */
        });
    }

    // --- CADASTRO ---
    const formCadastro = document.getElementById("cadastro-form");

    if (formCadastro) {
        formCadastro.addEventListener("submit", async function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const telefone = document.getElementById("telefone").value;
            const senha = document.getElementById("senha").value;

            if (!nome || !email || !telefone || !senha) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            const dadosCadastro = { nome, email, telefone, senha };

            try {
                const resposta = await fetch("http://localhost:8080/usuarios", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosCadastro)
                });

                const resultado = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(resultado.erro || "Erro ao realizar cadastro!");
                }

                console.log("Cadastro realizado com sucesso:", resultado);
                alert("Cadastro realizado com sucesso!");
                window.location.href = "../index.html"; // Redireciona para login

            } catch (erro) {
                console.error("Erro ao cadastrar:", erro.message);
                alert("Erro ao conectar com o servidor. Verifique se o backend está online.");
            }
        });
    }
});
