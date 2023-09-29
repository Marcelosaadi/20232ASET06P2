const irrf = require('./irrf')

describe('[Obter faixas IRRF]', () => {
    test('deve retornar 05 elementos', () => {
        const faixas = irrf.obterFaixas();
        expect(faixas.length).toEqual(5);
    });
});

describe('[Encontrar aliquota IRRF]', () => {
    test('deve retornar zero', () => {
        const faixas = irrf.obterFaixas();
        const result = irrf.faixaContemplaValor(100, faixas[0]);
        expect(result).toEqual(true);
    });
});




describe('[Calcular desconto IRRF]', () => {
    test('deve calcular o desconto corretamente', () => {
        const salarioBase = 2722.61;
        const faixas = irrf.obterFaixas();

        let resultado = 0;

        for (let i = 0; i < faixas.length; i++) {
            const faixaAtual = faixas[i];

            if (irrf.faixaContemplaValor(salarioBase, faixaAtual)) {
                const descontoFaixa = irrf.calcularDescontoFaixa(salarioBase, faixaAtual);
                resultado = Math.round(descontoFaixa * 100) / 100;
                break; 
            }
        }

        const resultadoEsperado = 45.80;

        expect(resultado).toEqual(resultadoEsperado);
    });
});

