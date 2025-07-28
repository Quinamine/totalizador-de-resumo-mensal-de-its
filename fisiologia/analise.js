function limparCelulas(celulas) {
    for(const cel of celulas) {
        cel.innerHTML = "";
    }
}
function desenharSeta(inputTarget) {
    const linhaDoInputTarget = inputTarget.parentElement;
    const inputUltimoMes= linhaDoInputTarget.querySelectorAll(".input-celular--focus")[0];
    const inputMesActual = linhaDoInputTarget.querySelectorAll(".input-celular--focus")[1];
    let outputsDalinhaDoInputTarget = linhaDoInputTarget.querySelectorAll(".output-seta");
    let seta, cloneDaSeta, outputDaSeta;
    if(inputMesActual.value !== "" && inputUltimoMes.value !== "") {
        if(Number(inputMesActual.value) > Number(inputUltimoMes.value)) {
            seta = document.querySelector(".seta-aumentou");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--aumentou")
        } else if(Number(inputMesActual.value) === Number(inputUltimoMes.value)) {
            seta = document.querySelector(".seta-estacionario");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--estacionario");
        } else if(Number(inputMesActual.value) < Number(inputUltimoMes.value)) {
            seta = document.querySelector(".seta-diminuiu");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--diminuiu");
        }
        limparCelulas(outputsDalinhaDoInputTarget);
        outputDaSeta.insertAdjacentElement("afterbegin", cloneDaSeta);
    } else {
        limparCelulas(outputsDalinhaDoInputTarget);
    }
}
let inputsUltimoMesEactual;
window.addEventListener("load", () => {
    inputsUltimoMesEactual = document.querySelectorAll(".ficha__grade-inf__linha .input-celular--focus");
    inputsUltimoMesEactual.forEach( inputTarget => {
        inputTarget.addEventListener("input", () => {
            desenharSeta(inputTarget);
        });
    });
})

function soma(operandos) {
    let soma = 0;
    for(const o of operandos) {
        soma+= Number(o.value);
    }
    return soma;
}
