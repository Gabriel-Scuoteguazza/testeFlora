const listaPalavras = ['javascript', 'html', 'css', 'youtube'];

let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numerosErros;


function iniciarJogo() {
    //Escolher uma palavra aleatória da lista
    palavraEscolhida = listaPalavras[Math.floor(Math.random() * listaPalavras.length)]; //sorteio de palavras


    //Iniciar a exibição de underscores "__"    display: none;
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');


    //Iniciar a lista de palavras chuatadas
    letrasChutadas = [];

    //Definir o número máximo de tentativas
    tentativasRestantes = 7; //TROCAR DEPOIS

    //Iniciar o número de erros
    numerosErros = 0;

    atualizarExibição();

}
function atualizarExibição() {
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');
    document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(', ')}`;

    document.getElementById("imagem").src = `../img/Macaco${numerosErros}.png`;

    //Verificar se o jogo terminou
    if (tentativasRestantes === 0) {
        encerrarJogo('VOCÊ MORREU!');
    } else if (!exibicaoPalavra.includes('_')) {
        encerrarJogo('PARABÉNS! VOCÊ VENCEU');
    }
}

function chutarLetra() {
    const entradaLetra = document.getElementById('entrada-letra');
    const letra = entradaLetra.value.toLowerCase();

    if (!letra.match(/[a-zà-ùç]/i)) {
        alert('Por favor, insira uma letra válida');
        return;
    }

    if (letrasChutadas.includes(letra)) {
        alert('Você já tentou essa letra');
        return;
    }

    letrasChutadas.push(letra);

    if (palavraEscolhida.includes(letra)) {
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra) {
                exibicaoPalavra[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
        numerosErros++;

        document.getElementById('som-erro').play();

        const somErro = document.getElementById('som-erro');
        somErro.volume = 0.3;     // deixa o volume mais baixo
        somErro.currentTime = 0;  // reinicia o áudio
        somErro.play();

        // cortar duração (igual à troca da imagem, ex: 1s)
        setTimeout(() => {
            somErro.pause();
            somErro.currentTime = 0;
        }, 1000);
    }

    entradaLetra.value = '';

    atualizarExibição();
}

function encerrarJogo(mensagem) {
    //Desabilitar o campo de digitação
    document.getElementById('entrada-letra').disabled = true;

    //Exibe a mensagem
    document.getElementById('mensagem').innerText = mensagem;

    //Exibe botão
    document.getElementById('botao-reiniciar').style.display = 'block';
}



window.load = iniciarJogo();

