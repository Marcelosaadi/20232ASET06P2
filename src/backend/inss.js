module.exports = {
    obterFaixas: function () {
        let faixas = [];

        const faixa01 = { inicioFaixa: 0, fimFaixa: 1320.00, aliquota: 0.075 };
        const faixa02 = { inicioFaixa: 1320.02, fimFaixa: 2571.29, aliquota: 0.09 };
        const faixa03 = { inicioFaixa: 2571.30, fimFaixa: 3856.94, aliquota: 0.12 };
        const faixa04 = { inicioFaixa: 3856.95, fimFaixa: 7507.49, aliquota: 0.14 };
        const teto = { inicioFaixa: 7507.50, fimFaixa: 1000000, aliquota: -1 };

        faixas.push(faixa01, faixa02, faixa03, faixa04, teto);

        return faixas;
    },

    calcularDescontoFaixa: function (faixa) {
        if (faixa) {
            const totalFaixa = (faixa.fimFaixa - faixa.inicioFaixa) * faixa.aliquota;
            return totalFaixa;
        } else {
            return 0;
        }
    },

    calcularDescontoResidual: function (salarioBruto, faixaAnterior, faixaAtual) {
        let residual = salarioBruto - faixaAnterior.fimFaixa;
        const descontoFaixa = residual * faixaAtual.aliquota;
        return descontoFaixa;
    },


    calcularDescontoProgressivo: function (salarioBruto) {
        const TETO_INSS = 877.24;

        let descontoFaixas = [];
        let faixas = this.obterFaixas();

        if(salarioBruto >= faixas[faixas.length -1].inicioFaixa){
            return TETO_INSS;
        }

        for (let i = 0; i < faixas.length; i++) {
            const faixaAtual = faixas[i];

            if (salarioBruto >= faixaAtual.fimFaixa) {
                const descontoFaixa = this.calcularDescontoFaixa(faixaAtual);
                descontoFaixas.push(descontoFaixa);
            }
            else {
                const faixaAnterior = faixas[i <= 0 ? i - 1 : i];
                const descontoFaixa = this.calcularDescontoResidual(salarioBruto, faixaAnterior, faixaAtual);
                descontoFaixas.push(descontoFaixa);
                break;
            }
        }

        let descontoINSS = descontoFaixas.reduce((acumulado, atual) => acumulado + atual, 0);

        //(n * 100) / 100 - utilizado para fazer o arredondamento para 2 casas decimais
        return Math.round(descontoINSS * 100) / 100;
    }
}
