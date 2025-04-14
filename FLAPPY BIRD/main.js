
    const bird = document.getElementById("bird");
    const game = document.getElementById("game");
    const scoreDisplay = document.getElementById("score");
    const gameOverScreen = document.getElementById("game-over");
    const finalScore = document.getElementById("final-score");

    const flapSound = document.getElementById("flap-sound");
    const pointSound = document.getElementById("point-sound");
    const hitSound = document.getElementById("hit-sound");

    const birdFrames = [
      'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-upflap.png',
      'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-midflap.png',
      'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-downflap.png'
    ];

    let birdTop = window.innerHeight * 0.4;
    bird.style.top = birdTop + "px";

    let gravity = window.innerHeight * 0.005;
    let isGameOver = false;
    let score = 0;
    let frameIndex = 0;

    function animateBird() {
      if (!isGameOver) {
        frameIndex = (frameIndex + 1) % birdFrames.length;
        bird.style.backgroundImage = `url(${birdFrames[frameIndex]})`;
      }
    }

    setInterval(animateBird, 150);

    function fall() {
      if (!isGameOver) {
        birdTop += gravity;
        bird.style.top = birdTop + "px";

        if (birdTop > window.innerHeight - bird.offsetHeight || birdTop < 0) {
          endGame();
        }
      }
    }

    function flap() {
      if (!isGameOver) {
        birdTop -= window.innerHeight * 0.06;
        flapSound.play();
        bird.style.transform = "rotate(-20deg)";
        setTimeout(() => bird.style.transform = "rotate(0deg)", 200);
      }
    }

    document.addEventListener("keydown", e => {
      if (e.code === "Space") flap();
    });

    document.addEventListener("touchstart", flap);

    function createPipe() {
      const pipeGap = window.innerHeight * 0.25;
      const pipeTopHeight = Math.floor(Math.random() * (window.innerHeight * 0.35)) + (window.innerHeight * 0.2);
      const pipeBottomHeight = window.innerHeight - pipeTopHeight - pipeGap;

      const pipeTop = document.createElement("div");
      pipeTop.classList.add("pipe", "pipe-top");
      pipeTop.style.height = pipeTopHeight + "px";
      pipeTop.style.left = "100vw";
      pipeTop.innerHTML = `<img src="https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/pipe-green.png">`;

      const pipeBottom = document.createElement("div");
      pipeBottom.classList.add("pipe", "pipe-bottom");
      pipeBottom.style.height = pipeBottomHeight + "px";
      pipeBottom.style.left = "100vw";
      pipeBottom.innerHTML = `<img src="https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/pipe-green.png">`;

      game.appendChild(pipeTop);
      game.appendChild(pipeBottom);

      let pipeX = window.innerWidth;

      const movePipe = setInterval(() => {
        if (isGameOver) {
          clearInterval(movePipe);
          return;
        }

        pipeX -= 2;
        pipeTop.style.left = pipeX + "px";
        pipeBottom.style.left = pipeX + "px";

        const birdRect = bird.getBoundingClientRect();
        const pipeTopRect = pipeTop.getBoundingClientRect();
        const pipeBottomRect = pipeBottom.getBoundingClientRect();

        if (
          pipeX < window.innerWidth * 0.25 &&
          pipeX + pipeTop.offsetWidth > window.innerWidth * 0.2 &&
          (birdRect.top < pipeTopRect.bottom || birdRect.bottom > pipeBottomRect.top)
        ) {
          endGame();
        }

        if (pipeX === Math.floor(window.innerWidth * 0.2)) {
          score++;
          scoreDisplay.textContent = "Score: " + score;
          pointSound.play();
        }

        if (pipeX < -pipeTop.offsetWidth) {
          pipeTop.remove();
          pipeBottom.remove();
          clearInterval(movePipe);
        }
      }, 20);
    }

    function endGame() {
      isGameOver = true;
      hitSound.play();
      gameOverScreen.style.display = "block";
      finalScore.textContent = `Your score: ${score}`;
    }

    setInterval(fall, 20);

    
    setInterval(() => {
      if (!isGameOver) createPipe();
    }, 3000);