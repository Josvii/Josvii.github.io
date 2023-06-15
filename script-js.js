// Nome: João Vitor Schiavinato Delfino
// R.A.: a2453363

const dicaInput = document.getElementById("dicaInput");
const listaMateriais = document.getElementById("listaMateriais");

function adicionaDica() {
    var select = document.getElementById("tipoMaterial");
    var materialInput = select.options[select.selectedIndex].text;

    if (dicaInput.value == '') {
        // Caso nada tenha sido digitado, uma mensagem de erro aparece na tela
        alert("ERRO, digite alguma coisa!");
    } else {
        // Cria os atributos que compoem o elemento
        var novaDica = document.createElement("li");
        var conteudo = document.createElement("p");
        var tipoMaterial = document.createElement("h3");

        // Verifica o tipo de material escolhido pelo usuario
        // Dependendo do tipo escolhido, a cor do elemento da lista muda de acordo
        if (materialInput == "Plástico") {
            tipoMaterial.setAttribute("id", "plastico");
            conteudo.setAttribute("id", "plastico");
        } else {
            if (materialInput == "Papel") {
                tipoMaterial.setAttribute("id", "papel");
                conteudo.setAttribute("id", "papel");
            }

            if (materialInput == "Vidro") {
                tipoMaterial.setAttribute("id", "vidro");
                conteudo.setAttribute("id", "vidro");
            }

            if (materialInput == "Metal") {
                tipoMaterial.setAttribute("id", "metal");
                conteudo.setAttribute("id", "metal");
            }

            if (materialInput == "Orgânico") {
                tipoMaterial.setAttribute("id", "organico");
                conteudo.setAttribute("id", "organico");
            }
        }

        // Adiciona os textos para os atributos do elemento (tipo de material e texto dica)
        conteudo.innerHTML = dicaInput.value;
        tipoMaterial.innerHTML = materialInput;

        // Os atributos são adicionados aos elementos, da seguinte forma: 
        // <li> <h3> Tipo de Material </h3> <p> Dica </p> <span> X </span> </li>,
        // sendo o span o X para apagar a dica individualmente
        novaDica.appendChild(tipoMaterial);
        novaDica.appendChild(conteudo);

        // Adiciona li para o ul
        listaMateriais.appendChild(novaDica);

        // Adiciona o botão de remover o elemento individualmente
        let botaoRemover = document.createElement("span");
        botaoRemover.innerHTML = "X";
        novaDica.appendChild(botaoRemover);
    }
    // Limpa o texto digitado no input box
    dicaInput.value = "";
    salvarLista();
    salvarListaOrganizada(tipoMaterial.innerHTML, conteudo.innerHTML);
}

// Esconde e mostra elementos de acordo com o botão que o usuário aperta
function escondeElemento(numero) {

    var secaoCadastrar = document.getElementsByClassName("secaoCadastrar")[0];
    var secaoFiltrar = document.getElementsByClassName("secaoFiltrar")[0];
    var secaoLista = document.getElementById("listaMateriais");
    var secaoHorarios = document.getElementById("secaoHorarios");

    // Dependendo do botão que o usuário aperta, é passado um número pra função,
    // e de acordo com o número, uma seção é mostrada
    // Se o botão apertado é "Cadastro", apenas a lista de cadastrados é mostrada
    if (numero == 1) {
        secaoCadastrar.style.display = "flex";
        secaoFiltrar.style.display = "none";
        secaoLista.style.display = "block";
        secaoHorarios.style.display = "none";
    }

    // Se o botão apertado é "Filtro", a seção de filtro é mostrada
    if (numero == 2) {
        secaoCadastrar.style.display = "none";
        secaoFiltrar.style.display = "flex";
        secaoLista.style.display = "block";
        secaoHorarios.style.display = "none";
    }

    // Se o botão apertado é "Horários", apenas os horários são mostrados
    if (numero == 3) {
        secaoCadastrar.style.display = "none";
        secaoFiltrar.style.display = "none";
        secaoLista.style.display = "none";
        secaoHorarios.style.display = "block";
    }
}

// LISTA NORMAL
// Remover o item da lista HTML
// Event listener para toda vez que o usário apertar o X
listaMateriais.addEventListener("click", function(e) {
	if (e.target.tagName === "SPAN") {
		e.target.parentElement.remove();
        salvarLista();
    }
}, false);

// Salva todas as dicas no local storage em formato HTML,
// com o intuito de transferir diretamente os elementos para a lista
function salvarLista() {
    localStorage.setItem("data", listaMateriais.innerHTML);
}

// Carrega a lista de dicas a partir do local storage em formato HTML
function carregaLista() {
    listaMateriais.innerHTML = localStorage.getItem("data");
}
carregaLista();

// Filtra os elementos da lista de acordo com o selected,
// dando display = 'none' para elementos que não correspondem ao material
function filtrar() {
    var select = document.getElementById("tipoMaterial2");
    var ul = document.getElementById("listaMateriais");
    var li = ul.getElementsByTagName("li");
    var escolha = select.options[select.selectedIndex].text;
    var materialElemento;
    var contaElementos = 0;     // Conta a quantidade de elementos que não estão sendo mostrados na lista.
                                // Se a quantidade elementos não sendo mostrados tiver o mesmo valor que o tamanho do array,
                                // então não há dicas cadastradas para o material escolhido

    // Se a escolha do usuário for diferente da primeira opção, começa o processo de filtrar
    if (escolha != "Selecione um material...") {
        for (i = 0; i < li.length; i++) {
            materialElemento = li[i].getElementsByTagName("h3")[0];
            li[i].style.display = 'flex';
    
            if (materialElemento.innerHTML != escolha) {
                li[i].style.display = 'none';
                contaElementos++;
            }
        }
    
        if (contaElementos == li.length) {
            alert("Não há dicas cadastradas para esse material!");
        }
    }
}

// Função que recarrega os elementos da lista visualmente,
// tirando quaisquer display = 'none', e só é chamada
// quando o usuário clica em "Cadastrar"
function recarregaLista() {
    var ul = document.getElementById("listaMateriais");
    var li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        li[i].style.display = 'flex';
    }
}

// LISTA ORGANIZADA
// Contém todos os materiais e dicas da lista normal, só que em forma de texto ao invés de HTML
var listaLocalStorage = [];

function salvarListaOrganizada(material, dica) {
    var novoElemento = {material: material, dica: dica};
    listaLocalStorage.push(novoElemento);
    localStorage.setItem('listaLocalStorage', JSON.stringify(listaLocalStorage));
}

// Função responsável por carregar do local storage a lista de dicas para o array novo
function carregaListaOrganizada() {
    var listaCarregada = JSON.parse(localStorage.getItem('listaLocalStorage'));
    listaLocalStorage = listaCarregada || [];
    // Reorganiza a lista caso alguma alteração tenha sido feita
    reorganizarListaLocalStorage();
}
carregaListaOrganizada();

// Remover o item
function removerItem(e) {
    if (e.target.tagName === "SPAN") {
        var elementoRemovido = e.target.parentElement;
        elementoRemovido.remove();

        // Remove o item correspondente do array listaLocalStorage
        var material = elementoRemovido.querySelector("h3").innerHTML;
        var dica = elementoRemovido.querySelector("p").innerHTML;
        var indice = -1;

        for (var i = 0; i < listaLocalStorage.length; i++) {
            if (listaLocalStorage[i].material === material && listaLocalStorage[i].dica === dica) {
                indice = i;
                break;
            }
        }

        if (indice !== -1) {
            listaLocalStorage.splice(indice, 1);
            salvarListaOrganizada();
        }
        reorganizarListaLocalStorage();
    }
}

// Função para reorganizar o array listaLocalStorage
function reorganizarListaLocalStorage() {
    // Cria um array novo e reorganiza ele de forma que quaisquer elementos removidos
    // não causem uma posição vazia no array
    var novaListaLocalStorage = [];

    var elementosLista = listaMateriais.querySelectorAll("li");

    elementosLista.forEach(function(elemento) {
        var material = elemento.querySelector("h3").innerHTML;
        var dica = elemento.querySelector("p").innerHTML;

        novaListaLocalStorage.push({ material: material, dica: dica });
    });

    listaLocalStorage = novaListaLocalStorage;
}

// Event listener para toda vez que o usuário apertar o X
// remover um item da lista organizada
listaMateriais.addEventListener("click", removerItem, false);

// LISTA DE HORÁRIOS
// Insere a lista de horários no local storage
var listaHorarios = [];

function salvarListaHorarios() {
    listaHorarios.push({bairro: "Vila dos Operários", diaDeColeta: "Segunda-feira, Quarta-Feira e Sexta-Feira", horario: "A partir das 7:00 H"});
    listaHorarios.push({bairro: "José Benedito Catarino", diaDeColeta: "Segunda-feira, Quarta-Feira e Sexta-Feira", horario: "A partir das 16:00 H"});
    listaHorarios.push({bairro: "Cristo Rei", diaDeColeta: "Terça-feira, Quinta-Feira e Sábado", horario: "A partir das 7:00 H"});
    listaHorarios.push({bairro: "Jardim Peróla", diaDeColeta: "Terça-feira, Quinta-Feira e Sábado", horario: "A partir das 16:00 H"});
    listaHorarios.push({bairro: "Distrito Administrativo: Congonhas", diaDeColeta: "Terça-feira e Sexta-Feira", horario: "A partir das 7:00 H"});
    listaHorarios.push({bairro: "AV. XV de Novembro", diaDeColeta: "Segunda-feira à Sábado", horario: "A partir das 18:00 H"});
    localStorage.setItem('listaHorarios', JSON.stringify(listaHorarios));
}
salvarListaHorarios();