"use strict"
const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll("[data-total], .input-celular--focus ");
        for (let i = 0; i < inputsCelulares.length; i++) {
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
    },
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        inputsNaoCelulares.forEach( inputTarget => {
            inputTarget.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${inputTarget.id}`, inputTarget.value));
            inputTarget.value = localStorage.getItem(`${keyPrefix}-${inputTarget.id}`);
        });
    }
}
const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        let classNameDosOperandos = inputTarget.dataset.total;
        inputTarget.classList.add(`${classNameDosOperandos}`);  
        let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaloutput}`);
        celulaDeSaida.value = this.somar(operandos);
        if(inputTarget.dataset.totalsindromes) {
            classNameDosOperandos = inputTarget.dataset.totalsindromes;
            inputTarget.classList.add(`${classNameDosOperandos}`);  
            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalsindromesoutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
        if(inputTarget.dataset.validacao) {
            classNameDosOperandos = inputTarget.dataset.validacao;
            inputTarget.classList.add(`${classNameDosOperandos}`);  
            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.validacaooutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
        if(inputTarget.dataset.analise) {
            let classNameDosOperandos = inputTarget.dataset.analise;
            let classNameDoDivisor = classNameDosOperandos.split("-div-")[1];
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const divisor = document.querySelector(`.${classNameDoDivisor}`);
            let div = (this.somar(operandos) - divisor.value) / divisor.value * 100;
            div = (div%2===0) ? div : div.toFixed(1);
            const analiseOutput = document.querySelector(`.${inputTarget.dataset.analiseoutput}`);
            analiseOutput.value = `${div}%`;
        }
    },
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-total]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => {
            totalizador.filtrarEtotalizarCelulas(inputCelular);
        });
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




