const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score'); // Referência ao elemento de pontuação
const speedElement = document.getElementById('speed'); // Referência ao elemento de velocidade
let score = 0; // Inicializa a variável de pontuação
let speed = 1.0; // Inicializa a velocidade
let difficultyIncreaseInterval = 30000; // 30 segundos em milissegundos
let lastDifficultyIncreaseTime = Date.now(); // Tempo do último aumento de dificuldade

// Intervalo mínimo e máximo para a criação de obstáculos
const intervaloMinimo = 2000; // 2 segundos
const intervaloMaximo = 5000; // 5 segundos

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 1000);
}

// Função para gerar um intervalo aleatório maior que o intervalo mínimo
function gerarIntervaloAleatorio() {
  return Math.floor(Math.random() * (intervaloMaximo - intervaloMinimo)) + intervaloMinimo;
}

// Função para criar um obstáculo
function criarObstaculo() {
  // Lógica para criar e adicionar o obstáculo ao jogo
  console.log("Obstáculo criado!");
  
  // Chama a função novamente após um intervalo aleatório
  const novoIntervalo = gerarIntervaloAleatorio();
  setTimeout(criarObstaculo, novoIntervalo);
}

// Inicia a criação de obstáculos
criarObstaculo();

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  // Verifica colisão
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(loop);
  } else {
    // Atualiza a pontuação se o tubo passou pelo Mario
    if (pipePosition < 0) {
      score += Math.floor(1 * speed); // Aumenta a pontuação proporcional à velocidade
      scoreElement.textContent = `Score: ${score}`; // Atualiza a exibição da pontuação
    }
  }

  // Aumenta a velocidade a cada 30 segundos
  if (Date.now() - lastDifficultyIncreaseTime > difficultyIncreaseInterval) {
    speed += 0.2; // Aumenta a velocidade
    lastDifficultyIncreaseTime = Date.now(); // Reseta o tempo do último aumento
    speedElement.textContent = `Speed: ${speed.toFixed(1)}x`; // Atualiza a exibição da velocidade
    pipe.style.animationDuration = `${(2 / speed)}s`; // Ajusta a duração da animação do tubo com base na velocidade
  }

}, 10);

document.addEventListener('keydown', jump);