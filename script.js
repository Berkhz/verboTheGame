let palavraSorteada = '';
let tentativas = 0;

async function carregarPalavras() {
    try {
        const response = await fetch('verbos.txt');

        if (!response.ok) {
            throw new Error('Não foi possível carregar as palavras');
        }

        const texto = await response.text();
        return texto;
    } catch (error) {
        throw new Error('500. Não foi possível carregar as palavras ' + error);
    }
}

async function filtrarPalavras() {
    try {
        const palavras = await carregarPalavras();
        const palavrasFiltradas = palavras
            .split('\n')
            .map(palavra => palavra.trim())
            .filter(palavra => palavra.length === 5);
        return palavrasFiltradas;
    } catch (error) {
        throw new Error('500. Não foi possível filtrar as palavras ' + error);
    }
}

async function sortearPalavra() {
    const palavrasFiltradas = await filtrarPalavras();
    const data = new Date();
    const palavraIndex = data.getDate() % palavrasFiltradas.length;
    palavraSorteada = palavrasFiltradas[palavraIndex];
}

function verificarTentativa(tentativa) {
    let resultado = [];
    let palavraArray = palavraSorteada.split('');

    for (let i = 0; i < tentativa.length; i++) {
        const letra = tentativa[i];
        if (letra === palavraArray[i]) {
            resultado.push('verde');
        } else if (palavraArray.includes(letra)) {
            resultado.push('amarelo');
        } else {
            resultado.push('cinza');
        }
    }

    return resultado;
}

function processarTentativa() {
    if (!palavraSorteada) {
        sortearPalavra();
    }

    const tentativa = getTentativa();

    if (tentativa.length !== 5) {
        alert('A tentativa deve ter 5 letras.');
        return;
    }

    const resultado = verificarTentativa(tentativa);

    for (let i = 0; i < resultado.length; i++) {
        const cell = document.querySelector(`#row${tentativas + 1} input:nth-child(${i + 1})`);
        cell.value = tentativa[i];
        cell.style.backgroundColor = resultado[i] === 'verde' ? 'green' : (resultado[i] === 'amarelo' ? 'yellow' : 'gray');
    }

    tentativas++;
    if (tentativa === palavraSorteada) {
        alert('Parabéns! Você acertou a palavra!');
        desabilitarTeclado();
    } else if (tentativas === 6) {
        alert(`Você perdeu! A palavra era: ${palavraSorteada}`);
        desabilitarTeclado();
    }
}

function desabilitarTeclado() {
    const teclas = document.querySelectorAll('.key');
    teclas.forEach(tecla => tecla.disabled = true);
}

function getTentativa() {
    const inputs = document.querySelectorAll(`.row:nth-child(${tentativas + 1}) input`);
    return Array.from(inputs).map(input => input.value.toUpperCase()).join('');
}

function adicionarLetra(letra) {
    const inputs = document.querySelectorAll(`.row:nth-child(${tentativas + 1}) input`);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].value = letra;
            break;
        }
    }
}

function removerUltimaLetra() {
    const inputs = document.querySelectorAll(`.row:nth-child(${tentativas + 1}) input`);
    for (let i = inputs.length - 1; i >= 0; i--) {
        if (inputs[i].value !== '') {
            inputs[i].value = '';
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', (e) => {
            const tecla = e.target.textContent;
            adicionarLetra(tecla);
        });
    });

    const backspaceButton = document.getElementById('backspace');
    backspaceButton.addEventListener('click', removerUltimaLetra);

    const enterButton = document.getElementById('enter');
    enterButton.addEventListener('click', processarTentativa);
});