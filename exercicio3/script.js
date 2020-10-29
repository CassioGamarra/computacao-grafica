function calcular(){
    const operacao = document.getElementById("operacoes").value; //Busca as operações 
    var resultado; //Variável para armazenar o resultado.

    const matrizA = criarMatriz(document.getElementsByName("matrizA"));  
    
    switch(operacao) {
        case 'escala':
            escala();
            break;
        case 'rotacao':
            if (verificaMatriz('b') !== 0) {
                error("Por favor, preencha os valores da matriz B!");
            } else {
                let resultado = somar(matrizA, matrizB);
                let vetor = criarVetor(resultado);
                result(vetor);
            } 
            break;
        case 'translacao':
            if (verificaMatriz('b') !== 0) {
                error("Por favor, preencha os valores da matriz B!");
            } else {
                let resultado = subtrair(matrizA, matrizB);
                let vetor = criarVetor(resultado);
                result(vetor);
            } 
            break;
        default:
            console.log("Sem operações");
    }
     
}
//Ativa e desativa campos
function enableDisableActions() {
    let operacao = document.getElementById("operacoes").value;
    if (operacao === "transposta") {
        matrizB('');
        document.getElementById("escalar").hidden = true;
        document.getElementById("vetor").hidden = true;
        document.getElementById("c12").hidden = false;
        document.getElementById("c22").hidden = false;
        document.getElementById("c32").hidden = false;
        document.getElementById("c13").hidden = false;
        document.getElementById("c23").hidden = false;
        document.getElementById("c33").hidden = false;
    } else if (operacao === "somaMatriz" || operacao === "subMatriz" || operacao === "multMatriz") {
        matrizB('ativa');
        document.getElementById("escalar").hidden = true;
        document.getElementById("vetor").hidden = true;
        document.getElementById("c12").hidden = false;
        document.getElementById("c22").hidden = false;
        document.getElementById("c32").hidden = false;
        document.getElementById("c13").hidden = false;
        document.getElementById("c23").hidden = false;
        document.getElementById("c33").hidden = false;
    } else if (operacao === "multVetor") {
        matrizB('');
        document.getElementById("c12").hidden = true;
        document.getElementById("c22").hidden = true;
        document.getElementById("c32").hidden = true;
        document.getElementById("c13").hidden = true;
        document.getElementById("c23").hidden = true;
        document.getElementById("c33").hidden = true;
        document.getElementById("escalar").hidden = true;
        document.getElementById("vetor").hidden = false;
    } else {
        matrizB('');
        document.getElementById("c12").hidden = false;
        document.getElementById("c22").hidden = false;
        document.getElementById("c32").hidden = false;
        document.getElementById("c13").hidden = false;
        document.getElementById("c23").hidden = false;
        document.getElementById("c33").hidden = false;
        document.getElementById("vetor").hidden = true;
        document.getElementById("escalar").hidden = false; 
    }
}
//Verifica os valores da matriz
function verificaMatriz(tipo) {
    let erros = 0;
    if (tipo === 'a') {
        document.getElementsByName("matrizA").forEach(elt => {
            if(elt.value === '') {
                erros++;
            } 
        })
    }
    return erros;
}


//Limpar os campos
function limparCampos() {
    document.getElementById("formulario").reset(); 
    document.getElementById("escalar").hidden = true;
    document.getElementById("resultado").hidden = true;
    document.getElementById("resultadoMatriz").hidden = true;
    document.getElementById("alerta").hidden = true;
    document.getElementById("alerta").innerHTML = '';
    document.getElementById("resultado").innerHTML = ''; 
    document.getElementById("vetor").hidden = true;
}

//Exibir erro
function error(msg) {
    document.getElementById("resultado").hidden = true;
    document.getElementById("alerta").hidden = false;
    document.getElementById("alerta").innerHTML = msg;
    let error = setTimeout(function () {
        document.getElementById("alerta").innerHTML = "";
        document.getElementById("alerta").hidden = true;
    }, 3000); //Esconde a mensagem após 3 segundos.
}
//Exibir resultado 
function result(vetor){
    document.getElementsByName("matrizReposta").forEach((elt, index) =>{
        elt.value = vetor[index]
    });
    document.getElementById("resultadoMatriz").hidden = false;
}
/*Operações*/
/*Calculo Escala*/
function escala() {
    let sX = Number(document.getElementById('valorSx').value);
    let sY = Number(document.getElementById('valorSy').value);
    document.getElementById('a11').value=sX;
    document.getElementById('a22').value=sY;
} 
//Cria uma matriz com base em um vetor
function criarMatriz(vetor){
    let matrizResultado =[[],[],[]]; //Matriz resultado, no formato 3x3
    //Vetores auxiliares
    let vetorA = [];
    let vetorB = [];
    let vetorC = [];
    //busca os elementos do vetor de acordo com as posições
    for (let i = 0; i < 9; i++) {
        if(i < 3) {
            vetorA.push(vetor[i].value);
        } else if (i < 6) {
            vetorB.push(vetor[i].value);
        } else {
            vetorC.push(vetor[i].value);
        }
    }
    matrizResultado[0] = vetorA;
    matrizResultado[1] = vetorB;
    matrizResultado[2] = vetorC;
    return matrizResultado;
}
//Cria um vetor com base em uma matriz
function criarVetor(matriz){
    let vetorA = [];
    let vetorB = [];
    let vetorC = [];
    //busca os elementos da matriz
    vetorA = matriz[0];
    vetorB = matriz[1];
    vetorC = matriz[2]; 

    return [].concat(vetorA, vetorB, vetorC); //concatena os vetores e retorna um só
}
//Cria um vetor com base em valores
function gerarVetor(){
    /*Vetor auxiliar*/
    let vetor = [];
    document.getElementsByName("vetor").forEach(elt => {
        vetor.push(elt.value);
    })
    return vetor;
}