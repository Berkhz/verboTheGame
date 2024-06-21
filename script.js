async function carregarPalavras() {
    try {
        const response = await fetch('verbos.txt')

        if (!response.ok)
        throw new Error('Não foi possível carregar as palavras')
    
        const texto = await response.text()
        return texto
    } catch (error) {
        throw new Error('500. Não foi possível carregar as palavras ' + error)
    }
}

async function filtrarPalavras() {
    try {
        const palavras = await carregarPalavras()
        const palavrasFiltradas = palavras.split('\n').filter(palavra => palavra.length === 6)
        console.log(palavrasFiltradas)
    } catch (error) {
        throw new Error('500. Não foi possível filtrar as palavras ' + error)
    }
    
}

filtrarPalavras()