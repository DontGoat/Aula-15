/*
Descricao: Exercícios da Aula 15 - JavaScript aplicado a Formulários
nome_arquivo: main.js
nome_exercicio: Atividade 15 - JavaScript aplicado a Formulários
nome_aluno: Pedro Henrique de Sousa Martins
email_aluno: pedro.martins55@aluno.cps.sp.gov.br
turma: A1129-N-D.S.M.-312-20262
*/

function mostrarMensagem(id, texto, tipo) {
    var mensagem = document.getElementById(id);
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
}

var comentario = document.getElementById("comentario");
var contador = document.getElementById("contador");

comentario.addEventListener("input", function () {
    var restante = 140 - comentario.value.length;
    contador.textContent = restante;

    if (restante <= 0) {
        contador.classList.add("erro");
    } else {
        contador.classList.remove("erro");
    }
});

document.getElementById("formComentario").addEventListener("submit", function (event) {
    event.preventDefault();

    if (comentario.value == "") {
        mostrarMensagem("msgComentario", "Escreva um comentário.", "erro");
    } else {
        mostrarMensagem("msgComentario", "Comentário enviado!", "sucesso");
    }
});

var senha = document.getElementById("senha");
var confirmarSenha = document.getElementById("confirmarSenha");
var btnCadastrar = document.getElementById("btnCadastrar");

function conferirSenhas() {
    if (confirmarSenha.value == "") {
        mostrarMensagem("msgSenha", "", "");
        btnCadastrar.disabled = true;
    } else if (senha.value == confirmarSenha.value) {
        mostrarMensagem("msgSenha", "As senhas coincidem", "sucesso");
        btnCadastrar.disabled = false;
    } else {
        mostrarMensagem("msgSenha", "As senhas são diferentes", "erro");
        btnCadastrar.disabled = true;
    }
}

senha.addEventListener("input", conferirSenhas);
confirmarSenha.addEventListener("input", conferirSenhas);

document.getElementById("formSenha").addEventListener("submit", function (event) {
    event.preventDefault();

    if (senha.value.length < 6) {
        mostrarMensagem("msgSenha", "A senha deve ter pelo menos 6 caracteres.", "erro");
    } else {
        mostrarMensagem("msgSenha", "Cadastro realizado com sucesso!", "sucesso");
    }
});

var produto = document.getElementById("produto");
var quantidade = document.getElementById("quantidade");
var totalPedido = document.getElementById("totalPedido");

function calcularTotal() {
    var preco = Number(produto.value);
    var qtd = Number(quantidade.value);
    var total = preco * qtd;

    totalPedido.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");
}

produto.addEventListener("change", calcularTotal);
quantidade.addEventListener("input", calcularTotal);

document.getElementById("formPedido").addEventListener("submit", function (event) {
    event.preventDefault();

    if (produto.value == "0") {
        mostrarMensagem("msgPedido", "Selecione um produto.", "erro");
    } else if (Number(quantidade.value) < 1) {
        mostrarMensagem("msgPedido", "A quantidade deve ser pelo menos 1.", "erro");
    } else {
        mostrarMensagem("msgPedido", "Pedido realizado com sucesso!", "sucesso");
    }
});

document.getElementById("formProduto").addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = document.getElementById("nomeProduto").value;
    var categoria = document.getElementById("categoria").value;
    var preco = document.getElementById("preco").value;
    var resultado = document.getElementById("resultadoJson");

    if (nome == "" || categoria == "" || preco == "") {
        mostrarMensagem("msgProduto", "Preencha todos os campos.", "erro");
        resultado.textContent = "";
        return;
    }

    var novoProduto = {
        nome: nome,
        categoria: categoria,
        preco: Number(preco)
    };

    var json = JSON.stringify(novoProduto, null, 2);

    console.log(json);
    resultado.textContent = json;
    mostrarMensagem("msgProduto", "JSON gerado!", "sucesso");
});

var telefone = document.getElementById("telefone");

telefone.addEventListener("keyup", function () {
    var numeros = telefone.value.replace(/\D/g, "").substring(0, 11);

    if (numeros.length > 7) {
        telefone.value = "(" + numeros.substring(0, 2) + ") " + numeros.substring(2, 7) + "-" + numeros.substring(7);
    } else if (numeros.length > 2) {
        telefone.value = "(" + numeros.substring(0, 2) + ") " + numeros.substring(2);
    } else if (numeros.length > 0) {
        telefone.value = "(" + numeros;
    } else {
        telefone.value = "";
    }
});

document.getElementById("formTelefone").addEventListener("submit", function (event) {
    event.preventDefault();

    var numeros = telefone.value.replace(/\D/g, "");

    if (numeros.length != 11) {
        mostrarMensagem("msgTelefone", "Digite um telefone completo com DDD.", "erro");
    } else {
        mostrarMensagem("msgTelefone", "Telefone salvo: " + telefone.value, "sucesso");
    }
});

var departamento = document.getElementById("departamento");
var funcionario = document.getElementById("funcionario");

var funcionarios = {
    ti: ["Allan", "Beatriz", "Carlos"],
    rh: ["Daniela", "Eduardo"]
};

departamento.addEventListener("change", function () {
    funcionario.innerHTML = "";

    if (departamento.value == "") {
        var vazio = document.createElement("option");
        vazio.value = "";
        vazio.textContent = "Escolha um departamento primeiro";
        funcionario.appendChild(vazio);
        return;
    }

    var lista = funcionarios[departamento.value];

    for (var i = 0; i < lista.length; i++) {
        var opcao = document.createElement("option");
        opcao.value = lista[i];
        opcao.textContent = lista[i];
        funcionario.appendChild(opcao);
    }
});

document.getElementById("formDepartamento").addEventListener("submit", function (event) {
    event.preventDefault();

    if (funcionario.value == "") {
        mostrarMensagem("msgDepartamento", "Selecione um departamento.", "erro");
    } else {
        mostrarMensagem("msgDepartamento", "Funcionário escolhido: " + funcionario.value, "sucesso");
    }
});

var habilidade = document.getElementById("habilidade");
var listaHabilidades = document.getElementById("listaHabilidades");

document.getElementById("formHabilidades").addEventListener("submit", function (event) {
    event.preventDefault();

    var texto = habilidade.value.trim();

    if (texto == "") {
        return;
    }

    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = texto;

    var botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.textContent = "X";
    botaoRemover.addEventListener("click", function () {
        tag.remove();
    });

    tag.appendChild(botaoRemover);
    listaHabilidades.appendChild(tag);

    habilidade.value = "";
    habilidade.focus();
});

var nascimento = document.getElementById("nascimento");
var btnFinalizar = document.getElementById("btnFinalizar");

nascimento.addEventListener("change", function () {
    if (nascimento.value == "") {
        mostrarMensagem("msgIdade", "", "");
        btnFinalizar.disabled = true;
        return;
    }

    var data = new Date(nascimento.value + "T00:00:00");
    var hoje = new Date();
    var idade = hoje.getFullYear() - data.getFullYear();
    var mes = hoje.getMonth() - data.getMonth();

    if (mes < 0 || (mes == 0 && hoje.getDate() < data.getDate())) {
        idade--;
    }

    if (idade >= 18) {
        mostrarMensagem("msgIdade", "Você tem " + idade + " anos.", "sucesso");
        btnFinalizar.disabled = false;
    } else {
        mostrarMensagem("msgIdade", "Apenas para maiores de idade", "erro");
        btnFinalizar.disabled = true;
    }
});

document.getElementById("formIdade").addEventListener("submit", function (event) {
    event.preventDefault();
    mostrarMensagem("msgIdade", "Cadastro finalizado com sucesso!", "sucesso");
});

var selecionarTodos = document.getElementById("selecionarTodos");
var itens = document.querySelectorAll(".item");

selecionarTodos.addEventListener("change", function () {
    for (var i = 0; i < itens.length; i++) {
        itens[i].checked = selecionarTodos.checked;
    }
});

for (var i = 0; i < itens.length; i++) {
    itens[i].addEventListener("change", function () {
        var todosMarcados = true;

        for (var j = 0; j < itens.length; j++) {
            if (itens[j].checked == false) {
                todosMarcados = false;
            }
        }

        selecionarTodos.checked = todosMarcados;
    });
}

document.getElementById("formLista").addEventListener("submit", function (event) {
    event.preventDefault();

    var marcados = document.querySelectorAll(".item:checked");

    if (marcados.length == 0) {
        mostrarMensagem("msgLista", "Marque pelo menos um item.", "erro");
    } else {
        mostrarMensagem("msgLista", marcados.length + " item(ns) selecionado(s).", "sucesso");
    }
});

var temaEscuro = document.getElementById("temaEscuro");

if (localStorage.getItem("tema") == "escuro") {
    document.body.classList.add("dark-theme");
    temaEscuro.checked = true;
}

temaEscuro.addEventListener("change", function () {
    if (temaEscuro.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("tema", "escuro");
    } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("tema", "claro");
    }
});

document.getElementById("formPerfil").addEventListener("submit", function (event) {
    event.preventDefault();
});
