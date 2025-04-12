var palavraDiaria = "";

function getPalavraDiaria() {
    fetch('verbos.txt')
        .then(response => response.text())
        .then(data => {
            const palavras = data.split('\n').map(palavra => palavra.trim());
            const index = new Date().getDate() % palavras.length;
            palavraDiaria = palavras[index];
        })
        .catch(error => console.error('Erro ao carregar o arquivo verbos.txt:', error));
}