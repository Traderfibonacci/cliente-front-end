document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector("#loginForm");
    const cadastroForm = document.querySelector("#cadastroForm");
    const editarForm = document.querySelector("#editarForm");
    const excluirForm = document.querySelector("#excluirForm");
    const buscarForm = document.querySelector("#buscarForm");
    const buscarCnpjForm = document.querySelector("#buscarCnpjForm");
    const mensagemSucesso = document.querySelector("#mensagemSucesso");
    const mensagemErro = document.createElement('p');
    mensagemErro.style.color = 'red';
    mensagemErro.style.display = 'none';

    const Icnpj = document.querySelector(".cnpj");
    const IRazaoSocial = document.querySelector(".razaoSocial");
    const IUsuario = document.querySelector(".usuario");
    const ISenha = document.querySelector(".senha");
    const IStatus = document.querySelector(".status");


    

    function validarCampos() {
        if (!Icnpj.value || Icnpj.value.length !== 14) {
            mensagemErro.textContent = "CNPJ é obrigatório e deve ter 14 dígitos.";
            mensagemErro.style.display = 'block';
            return false;
        }
        if (!IRazaoSocial.value || !IUsuario.value || !ISenha.value || !IStatus.value) {
            mensagemErro.textContent = "Todos os campos são obrigatórios.";
            mensagemErro.style.display = 'block';
            return false;
        }
        mensagemErro.style.display = 'none';
        return true;
    }

    function cadastrar() {
        if (!validarCampos()) return;

        fetch("http://localhost:8080/api/clientes", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                cnpj: Icnpj.value,
                razaoSocial: IRazaoSocial.value,
                usuario: IUsuario.value,
                senha: ISenha.value,
                status: IStatus.value
            })
        })
        .then(function (res) { 
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Erro ao realizar cadastro.");
            }
        })
        .then(function (data) {
            mensagemSucesso.textContent = "Cliente criado com sucesso!";
            mensagemSucesso.style.display = "block";
            setTimeout(() => {
                mensagemSucesso.style.display = "none";
            }, 3000);
        })
        .catch(function (error) { 
            console.error(error);
            alert(error.message);
        });
    }

    function editar() {
        if (!validarCampos()) return;

        fetch("http://localhost:8080/api/clientes/editar", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                cnpj: Icnpj.value,
                razaoSocial: IRazaoSocial.value,
                usuario: IUsuario.value,
                senha: ISenha.value,
                status: IStatus.value
            })
        })
        .then(function (res) { 
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Erro ao realizar edição.");
            }
        })
        .then(function (data) {
            mensagemSucesso.textContent = "Cliente editado com sucesso!";
            mensagemSucesso.style.display = "block";
            setTimeout(() => {
                mensagemSucesso.style.display = "none";
            }, 3000);
        })
        .catch(function (error) { 
            console.error(error);
            alert(error.message);
        });
    }

    function excluir() {
        const cnpj = document.querySelector(".cnpjExcluir").value;
        if (cnpj.length !== 14) {
            mensagemErro.textContent = "CNPJ deve ter 14 dígitos.";
            mensagemErro.style.display = 'block';
            return;
        }

        fetch(`http://localhost:8080/api/clientes/cnpj/${cnpj}`, {
            method: "DELETE"
        })
        .then(function (res) { 
            if (res.ok) {
                mensagemSucesso.textContent = "Cliente excluído com sucesso!";
                mensagemSucesso.style.display = "block";
                setTimeout(() => {
                    mensagemSucesso.style.display = "none";
                }, 3000);
            } else {
                throw new Error("Erro ao excluir cliente.");
            }
        })
        .catch(function (error) { 
            console.error(error);
            alert(error.message);
        });
    }

    function listarClientes() {
        fetch("http://localhost:8080/api/clientes", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
        .then(function (res) { 
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Erro ao listar clientes.");
            }
        })
        .then(function (data) {
            const clientesList = document.querySelector("#clientesList");
            clientesList.innerHTML = "";
            data.forEach(cliente => {
                const clienteItem = document.createElement("li");
                clienteItem.textContent = `CNPJ: ${cliente.cnpj}, Razão Social: ${cliente.razaoSocial}, Usuário: ${cliente.usuario}, Status: ${cliente.status}`;
                clientesList.appendChild(clienteItem);
            });
        })
        .catch(function (error) { 
            console.error(error);
            alert(error.message);
        });
    }

    function buscarPorRazaoSocial() {
        const razaoSocial = document.querySelector(".razaoSocialBuscar").value;
        if (!razaoSocial) {
            mensagemErro.textContent = "Razão Social é obrigatória.";
            mensagemErro.style.display = 'block';
            return;
        }

        fetch(`http://localhost:8080/api/clientes/razaosocial/${razaoSocial}`, {
            method: "GET"
        })
        .then(function (res) { 
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Erro ao buscar cliente.");
            }
        })
        .then(function (data) {
            const clientesList = document.querySelector("#clientesList");
            clientesList.innerHTML = "";
            const clienteItem = document.createElement("li");
            clienteItem.textContent = `CNPJ: ${data.cnpj}, Razão Social: ${data.razaoSocial}, Usuário: ${data.usuario}, Status: ${data.status}`;
            clientesList.appendChild(clienteItem);
        })
        .catch(function (error) { 
            console.error(error);
            alert(error.message);
        });
    }

    function buscarPorCnpj() {
        const cnpj = document.querySelector(".cnpjBuscar").value;
        if (!cnpj) {
            mensagemErro.textContent = "CNPJ é obrigatório.";
            mensagemErro.style.display = 'block';
            return;
        }

        fetch(`http://localhost:8080/api/clientes/cnpj/${cnpj}`, {
            method: "GET"
        })
        .then(function (res) { 
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Erro ao buscar cliente.");
            }
        })
        .then(function (data) {
            const clientesList = document.querySelector("#clientesList");
            clientesList.innerHTML = "";
            const clienteItem = document.createElement("li");
            clienteItem.textContent = `CNPJ: ${data.cnpj}, Razão Social: ${data.razaoSocial}, Usuário: ${data.usuario}, Status: ${data.status}`;
            clientesList.appendChild(clienteItem);
        })
        .catch(function (error) { 
            console.error(error);
            alert(error.message);
        });
    }

    function limpar() {
        Icnpj.value = "";
        IRazaoSocial.value = "";
        IUsuario.value = "";
        ISenha.value = "";
        IStatus.value = "ATIVO";
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function (event) {
            event.preventDefault();
            cadastrar();
            limpar();
        });
        cadastroForm.appendChild(mensagemErro);
    }

    if (editarForm) {
        editarForm.addEventListener('submit', function (event) {
            event.preventDefault();
            editar();
            limpar();
        });
        editarForm.appendChild(mensagemErro);
    }

    if (excluirForm) {
        excluirForm.addEventListener('submit', function (event) {
            event.preventDefault();
            excluir();
        });
        excluirForm.appendChild(mensagemErro);
    }

    if (buscarForm) {
        buscarForm.addEventListener('submit', function (event) {
            event.preventDefault();
            buscarPorRazaoSocial();
        });
        buscarForm.appendChild(mensagemErro);
    }

    if (buscarCnpjForm) {
        buscarCnpjForm.addEventListener('submit', function (event) {
            event.preventDefault();
            buscarPorCnpj();
        });
        buscarCnpjForm.appendChild(mensagemErro);
    }

    const listarButton = document.querySelector("#listarButton");
    if (listarButton) {
        listarButton.addEventListener('click', function () {
            window.location.href = 'listar.html';
        });
    }

    if (window.location.pathname.endsWith('listar.html')) {
        listarClientes();
    }

    
});





