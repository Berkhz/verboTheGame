async function carregarPalavras() {
    try {
        const response = await fetch('verbos.txt')
        if (!response.ok)
        throw new Error('Não foi possível carregar as palavras')

        const texto = response.text()
        const palavras = texto.split('\n').map(palavra => palavra.trim()).filter(palavra => palavra.length > 0)

        console.log(palavras)
    } catch (error) {
        throw new Error('500. An error has occurred ' + error)
    }
}

carregarPalavras()