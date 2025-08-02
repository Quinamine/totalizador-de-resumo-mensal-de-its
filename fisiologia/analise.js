function limparCelulas(celulas) {
    for(const cel of celulas) {
        cel.innerHTML = "";
    }
}
function desenharSeta(inputTarget) {
    const linhaDoInputTarget = inputTarget.parentElement;
    let inputUltimoMes= linhaDoInputTarget.querySelectorAll(".input-celular--focus")[0];
    let inputMesActual = linhaDoInputTarget.querySelectorAll("[readonly]")[0];
    inputUltimoMes = inputUltimoMes.value.replace(/\D/g, "");
    inputMesActual = inputMesActual.value.replace(/\D/g, "");
    let outputsDalinhaDoInputTarget = linhaDoInputTarget.querySelectorAll(".output-seta");
    let seta, cloneDaSeta, outputDaSeta;
    if(inputMesActual !== "" && inputUltimoMes !== "") {
        if(Number(inputMesActual) > Number(inputUltimoMes)) {
            seta = document.querySelector(".seta-aumentou");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--aumentou")
        } else if(Number(inputMesActual) === Number(inputUltimoMes)) {
            seta = document.querySelector(".seta-estacionario");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--estacionario");
        } else if(Number(inputMesActual) < Number(inputUltimoMes)) {
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
        desenharSeta(inputTarget)
    });
})
