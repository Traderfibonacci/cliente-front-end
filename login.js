document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector("#loginForm");
    const mensagemErro = document.querySelector("#mensagemErro");
    const mensagemSucesso = document.querySelector("#mensagemSucesso");

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const cnpj = document.querySelector("#cnpj").value;
        const senha = document.querySelector("#senha").value;

        if (cnpj.length !== 14) {
            mensagemErro.textContent = "CNPJ deve ter 14 dígitos.";
            mensagemErro.style.display = 'block';
            return;
        }

        fetch("http://localhost:8080/api/clientes/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ cnpj, senha })
        })
        .then(function (res) { 
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(error => { throw new Error(error.message); });
            }
        })
        .then(function (data) {
            mensagemSucesso.textContent = data.message;
            mensagemSucesso.style.display = "block";
            setTimeout(() => {
                mensagemSucesso.style.display = "none";
                window.location.href = "index.html";
            }, 3000);
        })
        .catch(function (error) { 
            mensagemErro.textContent = error.message;
            mensagemErro.style.display = 'block';
        });
    });
});

