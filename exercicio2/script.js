function calcular(){
    const operacao = document.getElementById("operacoes").value; //Busca as operações

    const vetorAuxiliar = gerarVetor(); //Inicializa o Vetor
    const escalar = Number(document.getElementById("valorEscalar").value); //Busca o valor do escalar
    var resultado; //Variável para armazenar o resultado.

    const matrizA = criarMatriz(document.getElementsByName("matrizA")); 
    const matrizB = criarMatriz(document.getElementsByName("matrizB"));
    
    if (verificaMatriz('a') !== 0) {
        error("Por favor, preencha os valores e selecione a operação!");
    } else {
        switch(operacao) {
            case 'transposta':
                let resultado = transposta(matrizA);
                let vetor = criarVetor(resultado);
                result(vetor);
                break;
            case 'somaMatriz':
                if (verificaMatriz('b') !== 0) {
                    error("Por favor, preencha os valores da matriz B!");
                } else {
                    let resultado = somar(matrizA, matrizB);
                    let vetor = criarVetor(resultado);
                    result(vetor);
                } 
                break;
            case 'subMatriz':
                if (verificaMatriz('b') !== 0) {
                    error("Por favor, preencha os valores da matriz B!");
                } else {
                    let resultado = subtrair(matrizA, matrizB);
                    let vetor = criarVetor(resultado);
                    result(vetor);
                } 
                break;
            case 'multMatriz':
                if (verificaMatriz('b') !== 0) {
                    error("Por favor, preencha os valores da matriz B!");
                } else {
                    let resultado = multiplicar(matrizA, matrizB);
                    let vetor = criarVetor(resultado);
                    result(vetor);
                } 
                break;
            case 'multVetor':  
                if (verificaMatriz('vetor') !== 0) {
                    error("Por favor, preencha os valores do vetor");
                } else {
                    let resultado = multiplicarVetor(matrizA, vetorAuxiliar);
                    let vetor = criarVetor(resultado);
                    resultVetor(vetor);
                }  
                break;
            case 'multEscalar':
                if (escalar) {
                    let vetor = criarVetor(matrizA);
                    let resultado = multiplicarEscalar(vetor, escalar);
                    result(resultado);
                } else {
                    error("Por favor, preencha o valor do escalar!");
                }
                break;
            case 'divEscalar':
                if (escalar && escalar !== 0) { 
                    let vetor = criarVetor(matrizA);
                    let resultado = divisaoEscalar(vetor, escalar);
                    result(resultado);
                } else {
                    error("Por favor, preencha o valor do escalar!");
                }
                break;
            default:
                console.log("Sem operações");
        }
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
//Ativar e desativar matriz b
function matrizB(acao) {
    if (acao === "ativa") {
        document.getElementsByName("matrizB").forEach(element => {
            element.disabled = false;
        });
    } else {
        document.getElementsByName("matrizB").forEach(element => {
            element.disabled = true;
            element.value = '';
        });
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

    if (tipo === 'b') {
        document.getElementsByName("matrizB").forEach(elt => {
            if(elt.value === '') {
                erros++;
            } 
        })
    }

    if (tipo === 'vetor') {
        document.getElementsByName("vetor").forEach(elt => {
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
//Exibir resultado caso seja uma multiplicação por vetor
function resultVetor(vetor) {
    /*Atribui os valores*/
    document.getElementById("c11").value = vetor[0];
    document.getElementById("c21").value = vetor[1];
    document.getElementById("c31").value = vetor[2];

    document.getElementById("resultadoMatriz").hidden = false;
}
/*Operações*/
/*Calculo da Matriz transposta*/
function transposta(matriz){ 
    let matrizTransposta = [[],[],[]];

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            matrizTransposta[i][j] = matriz[j][i];
        }
    }
    return matrizTransposta;
}
/*Calculo da multiplicação por escalar*/
function multiplicarEscalar(vetor, escalar) {
    let resultado = [];
    vetor.forEach(elt => {
        resultado.push(elt * escalar);
    })
    return resultado;
}
/*Calculo da divisão por escalar*/
function divisaoEscalar(vetor, escalar) {
    let resultado = [];
    vetor.forEach(elt => {
        resultado.push(elt / escalar);
    })
    return resultado;
}
/*Soma de matrizes*/
function somar(matrizA, matrizB) {
    let matrizResultado = [[],[],[]];

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            matrizResultado[i][j] = Number(matrizA[i][j])+Number(matrizB[i][j]);
        }
    }
    return matrizResultado;
}
/*Subtração de matrizes*/ 
function subtrair(matrizA, matrizB) {
    let matrizResultado = [[],[],[]];

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            matrizResultado[i][j] = Number(matrizA[i][j])-Number(matrizB[i][j]);
        }
    }
    return matrizResultado;
}
/*Multiplicação de matrizes*/
function multiplicar(matrizA, matrizB) {
    let matrizResultado = [[],[],[]];

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            matrizResultado[i][j] = Number(matrizA[i][0])*Number(matrizB[0][j])+Number(matrizA[i][1])*Number(matrizB[1][j])+Number(matrizA[i][2])*Number(matrizB[2][j]);
        }
    }
    return matrizResultado;
}
/*Multiplicação de matriz por vetor*/
function multiplicarVetor(matrizA, vetor) {
    let matrizResultado = [[],[],[]];

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            matrizResultado[i][j] = Number(matrizA[i][0])*Number(vetor[0])+Number(matrizA[i][1])*Number(vetor[1])+Number(matrizA[i][2])*Number(vetor[2]);
        }
    }
    let vetorResultado = [matrizResultado[0][0], matrizResultado[1][0], matrizResultado[2][0]]; //Pega apenas uma coluna de resultado
    return vetorResultado;
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