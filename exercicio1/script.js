function calcular(){
    const operacao = document.getElementById("operacoes").value;
    const vetor = []; //Cria o vetor principal
    const vetorAux = []; //Cria o vetor secundario
    /*Vetor principal*/
    const x = document.getElementById("x").value; //Busca o valor de X
    const y = document.getElementById("y").value; //Busca o valor de Y
    const z = document.getElementById("z").value; //Busca o valor de Z
    //Monta o vetor principal
    if(x && y && z) {
        vetor.push(x);
        vetor.push(y);
        vetor.push(z);
    }
    /*Vetor auxiliar*/
    const xVetorAux = document.getElementById("xVetorAux").value; //Busca o valor de X do vetor auxiliar
    const yVetorAux = document.getElementById("yVetorAux").value; //Busca o valor de Y do vetor auxiliar
    const zVetorAux = document.getElementById("zVetorAux").value; //Busca o valor de Z do vetor auxiliar
    //Monta o vetor auxiliar
    if(xVetorAux && yVetorAux && zVetorAux) {
        vetorAux.push(xVetorAux);
        vetorAux.push(yVetorAux);
        vetorAux.push(zVetorAux);
    }
    const escalar = document.getElementById("valorEscalar").value; //Busca o valor do escalar
    
    var resultado; //Variável para armazenar o resultado.
    
    if(vetor.length > 0) {
        switch(operacao) {
            case 'modulo':
                resultado =  "O módulo do vetor (" + vetor[0] + ", " + vetor[1] + ", " + vetor[2] + ") é: " + (moduloVetor(vetor));
                break;
            case 'normalizar':
                resultado = "O vetor (" + vetor[0] + ", " + vetor[1] + ", " + vetor[2] + ") normalizado é: " + (normalizar(vetor));
                break;
            case 'somar':
                if(vetorAux.length > 0) {
                    resultado = "A soma do vetor (" + vetor[0] + ", " + vetor[1] + ", " + vetor[2] + ") com o vetor (" + vetorAux[0] + ", " + vetorAux[1] + ", " + vetorAux[2] + ") é: " + somar(vetor, vetorAux);
                } else {
                    error("Por favor, preencha o vetor auxiliar!");
                }
                break;
            case 'subtrair':
                if(vetorAux.length > 0) {
                    resultado = "A subtração do vetor (" + vetor[0] + ", " + vetor[1] + ", " + vetor[2] + ") com o vetor (" + vetorAux[0] + ", " + vetorAux[1] + ", " + vetorAux[2] + ") é: " + subtrair(vetor, vetorAux);
                } else {
                    error("Por favor, preencha o vetor auxiliar!");
                }
                break;
            case 'multiplicar_escalar':
                if(escalar) {
                    resultado = "A multiplicação do vetor (" + vetor[0] + ", " + vetor[1] + ", " + vetor[2] + ") pelo escalar "+escalar+" é: " + multiplicarPorEscalar(vetor, escalar);
                } else {
                    error("Por favor, preencha o valor do escalar!");
                }
                break;
            case 'dividir_escalar':
                if (escalar) {
                    resultado = "A divisão do vetor (" + vetor[0] + ", " + vetor[1] + ", " + vetor[2] + ") pelo escalar "+escalar+" é: " + dividirPorEscalar(vetor, escalar);
                } else {
                    error("Por favor, preencha o valor do escalar!");
                }
                break;
            case 'produto_escalar':
                if(vetorAux.length > 0) {
                    resultado = "O produto do vetor (" + vetor[0] + ", " + vetor[1] + ", " + vetor[2] + ") com o vetor (" + vetorAux[0] + ", " + vetorAux[1] + ", " + vetorAux[2] + ") é: " + produtoEscalar(vetor, vetorAux);
                } else {
                    error("Por favor, preencha o vetor auxiliar!");
                }
                break;
            default:
                console.log("Sem operações");
        }
        
        if (resultado) {
            document.getElementById("resultado").hidden = false;
            document.getElementById("resultado").innerHTML = resultado;
        }
    } else {
        error("Por favor, selecione os valores e a operação!");
    }
}

//Ativa e desativa campos
function enableDisableActions() {
    let operacao = document.getElementById("operacoes").value;
    if (operacao === "somar" || operacao === "subtrair" || operacao === "produto_escalar") {
        document.getElementById("xVetorAux").disabled = false;
        document.getElementById("yVetorAux").disabled = false;
        document.getElementById("zVetorAux").disabled = false;
    } else {
        document.getElementById("xVetorAux").disabled = true;
        document.getElementById("yVetorAux").disabled = true;
        document.getElementById("zVetorAux").disabled = true;
    }
    
    if (operacao === "multiplicar_escalar" || operacao === "dividir_escalar") {
        document.getElementById("escalar").hidden = false;
    } else {
        document.getElementById("escalar").hidden = true;
    }
}

//Limpar os campos
function limparCampos() {
    document.getElementById("formulario").reset();
    document.getElementById("escalar").hidden = true;
    document.getElementById("resultado").hidden = true;
    document.getElementById("alerta").hidden = true;
    document.getElementById("alerta").innerHTML = '';
    document.getElementById("resultado").innerHTML = '';
    document.getElementById("xVetorAux").disabled = true;
    document.getElementById("yVetorAux").disabled = true;
    document.getElementById("zVetorAux").disabled = true;	
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

/*Operações*/
/*Módulo do vetor*/
function moduloVetor(vetor) {
    return Math.sqrt(Math.pow(vetor[0], 2)+Math.pow(vetor[1], 2)+Math.pow(vetor[2], 2));
}
/*Normalização de vetor*/
function normalizar(vetor) {
    let modulo = moduloVetor(vetor);
    let vetorResultado = [];
    for (let i = 0; i < 3; i++) {
        vetorResultado[i] = Number(vetor[i] / modulo);
    } 
    return "("+vetorResultado[0]+", "+vetorResultado[1]+", "+vetorResultado[2]+")"; 
}
/*Soma de vetores*/
function somar(vetorA, vetorB) {
    let vetor = [];
    for(let i = 0; i < 3; i++) {
        vetor[i] = Number(vetorA[i]) + Number(vetorB[i]);
    }
    return "("+vetor[0]+", "+vetor[1]+", "+vetor[2]+")";
}
/*Subtração de vetores*/
function subtrair(vetorA, vetorB) {
    let vetor = [];
    for(let i = 0; i < 3; i++) {
        vetor[i] = Number(vetorA[i]) - Number(vetorB[i]);
    }
    return "("+vetor[0]+", "+vetor[1]+", "+vetor[2]+")";
}
/*Multiplicação por escalar*/
function multiplicarPorEscalar(vetor, escalar) {
    let vetorResultado = [];
    for (let i = 0; i < 3; i++) {
        vetorResultado[i] = Number(vetor[i] * escalar);
    } 
    return "("+vetorResultado[0]+", "+vetorResultado[1]+", "+vetorResultado[2]+")"; 
}
/*Divisão por escalar*/
function dividirPorEscalar(vetor, escalar) { 
    let vetorResultado = [];
    for (let i = 0; i < 3; i++) {
        vetorResultado[i] = Number(vetor[i] / escalar);
    } 
    return "("+vetorResultado[0]+", "+vetorResultado[1]+", "+vetorResultado[2]+")"; 
}
/*Produto escalar*/
function produtoEscalar(vetorA, vetorB) {
    let resultado = 0;
    for(let i = 0; i < 3; i++) {
        resultado += Number(vetorA[i]) * Number(vetorB[i]);
    }
    return resultado;
}