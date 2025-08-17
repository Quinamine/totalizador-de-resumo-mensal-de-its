function drawArrow(inputUltimoMes, inputMesActual) {
    let linhaDoInputTarget = inputMesActual.parentElement;
    let outputsDasSetas = linhaDoInputTarget.querySelectorAll(".output-seta");
    let seta, cloneDaSeta, outputDaSeta;
    inputUltimoMes = inputUltimoMes.value.replace(/\D/g, "");
    inputMesActual = inputMesActual.value.replace(/\D/g, "");
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
function filtrarOperandos(inputTarget) {
    if(inputTarget.dataset.analise1ponto1) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise1ponto1output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);   
    }
    if(inputTarget.dataset.analise2ponto2) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise2ponto2output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);
    }
    if(inputTarget.dataset.analise4ponto4) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise4ponto4output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);
    }
    if(inputTarget.dataset.analise3ponto1) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise3ponto1output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);
    }
    if(inputTarget.dataset.analise3ponto2) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise3ponto2output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);
    }
    if(inputTarget.dataset.analise4ponto1) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise4ponto1output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);
    }
    if(inputTarget.dataset.analise4ponto5) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise4ponto5output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);
    }
    if(inputTarget.dataset.analise4ponto6output) {
        let classNameDeCelulaDeSaida = inputTarget.dataset.analise4ponto6output;
        const outputMesActual = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        drawArrow(outputMesActual.previousElementSibling, outputMesActual);
    }
}
window.addEventListener("load", () => {
    const inputsCelulares = document.querySelectorAll("[data-total], [data-analise3ponto1], [data-analise4ponto6output]");
    inputsCelulares.forEach( inputTarget => {
        inputTarget.addEventListener("input", () => {
            filtrarOperandos(inputTarget)
        });
    });
});