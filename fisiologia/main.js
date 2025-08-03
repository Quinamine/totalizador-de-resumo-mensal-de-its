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
    totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, eTaxa) {
        inputTarget.classList.add(`${classNameDosOperandos}`);  
        let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        let celulaDeSaida = document.querySelector(`.${classNameDeCelulaDeSaida}`);
        celulaDeSaida.value = this.somar(operandos);
        if(eTaxa || eTaxa === "divisao") {
            let classNameDoDivisor = classNameDosOperandos.split("-div-")[1];
            const divisor = document.querySelector(`.${classNameDoDivisor}`);
            let taxa = (this.somar(operandos) - divisor.value) / divisor.value;
            eTaxa === 1 && (taxa *= 100);
            taxa = (Number.isInteger(taxa)) ? taxa : taxa.toFixed(1);
            celulaDeSaida.value = eTaxa === 1 ? `${taxa}%` : taxa;
        }
    },
    filtrarOperandos(inputTarget) {
        this.totalizar(inputTarget, `${inputTarget.dataset.total}`, `${inputTarget.dataset.totaloutput}`);
        if(inputTarget.dataset.totalsindromes) {
            const classNameDosOperandos = inputTarget.dataset.totalsindromes;
            const classNameDeCelulaDeSaida = inputTarget.dataset.totalsindromesoutput;
            this.totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, 0);
        }
        if(inputTarget.dataset.validacao) {
            const classNameDosOperandos = inputTarget.dataset.validacao;
            const classNameDeCelulaDeSaida = inputTarget.dataset.validacaooutput;
            this.totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, 0);
        }
        if(inputTarget.dataset.analise1ponto1) {
            const analiseOutput = document.querySelector(`.${inputTarget.dataset.analise1ponto1output}`);
            analiseOutput.value = inputTarget.value;
        }
        if(inputTarget.dataset.analise2ponto2) {
            const classNameDosOperandos = inputTarget.dataset.analise2ponto2;
            const classNameDeCelulaDeSaida = inputTarget.dataset.analise2ponto2output;
            this.totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, 1);
        }
        if(inputTarget.dataset.analise4ponto4) {
            const classNameDosOperandos = inputTarget.dataset.analise4ponto4;
            const classNameDeCelulaDeSaida = inputTarget.dataset.analise4ponto4output;
            this.totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, 1);
        }
        if(inputTarget.dataset.analise3ponto1) {
            const classNameDosOperandos = inputTarget.dataset.analise3ponto1;
            const classNameDeCelulaDeSaida = inputTarget.dataset.analise3ponto1output;
            this.totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, "divisao");
        }
        if(inputTarget.dataset.analise3ponto2) {
            const classNameDosOperandos = inputTarget.dataset.analise3ponto2;
            const classNameDeCelulaDeSaida = inputTarget.dataset.analise3ponto2output;
            this.totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, "divisao");
        }
        if(inputTarget.dataset.analise4ponto1) {
            let classNameDosOperandos = inputTarget.dataset.analise4ponto1;
            let classNameDoDividendo = classNameDosOperandos.split("-div-")[0];
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const dividendo = document.querySelector(`.${classNameDoDividendo}`);
            let div = dividendo.value / (this.somar(operandos) - dividendo.value) * 100;
            div = (Number.isInteger(div)) ? div : div.toFixed(1);
            const analiseOutput = document.querySelector(`.${inputTarget.dataset.analise4ponto1output}`);
            analiseOutput.value = `${div}%`;
        }
        if(inputTarget.dataset.analise4ponto5) {
            const classNameDosOperandos = inputTarget.dataset.analise4ponto5;
            const classNameDeCelulaDeSaida = inputTarget.dataset.analise4ponto5output;
            this.totalizar(inputTarget, classNameDosOperandos, classNameDeCelulaDeSaida, 1)
        }
        if(inputTarget.dataset.analise4ponto6output) {
            const pvHIVrastreadasIts = document.getElementById("rastreio-de-pvhiv");
            const consultasDePvHIV = document.getElementById("consultas-de-pvhiv");
            let div = pvHIVrastreadasIts.value / consultasDePvHIV.value * 100;
            div = (Number.isInteger(div)) ? div : div.toFixed(1);
            const analiseOutput = document.querySelector(`.${inputTarget.dataset.analise4ponto6output}`);
            analiseOutput.value = `${div}%`;
        }
    },
    somar(operandos) {
        let soma = 0;
        for(const o of operandos) {
            soma += Number(o.value);
        }
        return soma;
    },
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-total], [data-analise3ponto1], [data-analise4ponto6output]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => {
            totalizador.filtrarOperandos(inputCelular);
        });
        inputCelular.value !== "" && totalizador.filtrarOperandos(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




