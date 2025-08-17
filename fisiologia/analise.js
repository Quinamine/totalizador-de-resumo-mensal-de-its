function limparCelulas(celulas) {
    for(const cel of celulas) {
        cel.innerHTML = "";
    }
}
function desenharSeta(inputUltimoMes, inputMesActual) {
    let linhaDoInputTarget = inputMesActual.parentElement;
    let outputsDasSetas = linhaDoInputTarget.querySelectorAll(".output-seta");
    let seta, cloneDaSeta, outputDaSeta;
    inputUltimoMes = inputUltimoMes.value.replace(/[^0-9.]/g, "");
    inputMesActual = inputMesActual.value.replace(/[^0-9.]/g, "");
    if(inputMesActual !== "" && inputUltimoMes !== "") {
        if(Number(inputMesActual) > Number(inputUltimoMes)) {
            seta = document.querySelector(".seta-aumentou");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--aumentou");
        } else if(Number(inputMesActual) === Number(inputUltimoMes)) {
            seta = document.querySelector(".seta-estacionario");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--estacionario");
        } else if(Number(inputMesActual) < Number(inputUltimoMes)) {
            seta = document.querySelector(".seta-diminuiu");
            cloneDaSeta = seta.cloneNode(seta, true);
            outputDaSeta = linhaDoInputTarget.querySelector(".output-seta--diminuiu");
        }
        limparCelulas(outputsDasSetas);
        outputDaSeta.insertAdjacentElement("afterbegin", cloneDaSeta);
    } else {
        limparCelulas(outputsDasSetas);
    }
}
let inputsUltimoMesEactual;
window.addEventListener("load", () => {
    inputsUltimoMesEactual = document.querySelectorAll(".input-celular--ultimo-mes");
    inputsUltimoMesEactual.forEach( inputTarget => {
        const outputMesActual = inputTarget.nextElementSibling;
        inputTarget.addEventListener("input", () => {
            desenharSeta(inputTarget, outputMesActual);
        });
        desenharSeta(inputTarget, outputMesActual);
    });
})
