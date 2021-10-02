const opponentAttackAnimation = (attack) => {
  const emberSound = new Audio('./sounds/ember.wav');
  const opponentAnimatedSound = new Audio('./sounds/opponent-1.wav');
  opponentAnimatedSound.volume = game.audioLevel;
  emberSound.volume = game.audioLevel;

  return new Promise((resolve, reject) => {
    const opponentPokemon = document.querySelector('.opponentPokemon');
    const playerPokemon = document.querySelector('.playerPokemon');

    if (attack.type === 'Normal') {
      opponentPokemon.classList.add('opponent--attack');
      playerPokemon.classList.add('damage');

      setTimeout(() => {
        emberSound.play();
      }, 200);

      setTimeout(() => {
        opponentPokemon.classList.remove('opponent--attack');
        playerPokemon.classList.remove('damage');
        resolve(true);
      }, 2750);
    }

    if (attack.type === 'Animated') {
      playerPokemon.classList.add('opponent--attack-animated');
      playerPokemon.classList.add('damage');

      setTimeout(() => {
        opponentAnimatedSound.play();
      }, 200);

      setTimeout(() => {
        playerPokemon.classList.remove('opponent--attack-animated');
        playerPokemon.classList.remove('damage');
        opponentAnimatedSound.pause();
        resolve(true);
      }, 2000);
    }
  });
};

const playerAttackAnimation = (attack) => {
  const emberSound = new Audio('./sounds/ember.wav');
  emberSound.volume = game.audioLevel;
  const fireSound = new Audio('./sounds/fire.wav');
  fireSound.volume = game.audioLevel;
  const grassSound = new Audio('./sounds/grass.wav');
  grassSound.volume = game.audioLevel;
  const waterSound = new Audio('./sounds/water.wav');
  waterSound.volume = game.audioLevel;

  return new Promise((reslove, reject) => {
    const opponentPokemon = document.querySelector('.opponentPokemon');
    const playerPokemon = document.querySelector('.playerPokemon');

    if (attack.type === 'Normal') {
      if (attack.image === 'slash.gif') {
        opponentPokemon.classList.add('damage');
        opponentPokemon.classList.add('slash');
        setTimeout(() => {
          emberSound.play();
        }, 200);

        setTimeout(() => {
          opponentPokemon.classList.remove('damage');
          opponentPokemon.classList.remove('slash');
          reslove(true);
        }, 750);

        return;
      }
      playerPokemon.classList.add('player--attack');
      opponentPokemon.classList.add('damage');

      setTimeout(() => {
        emberSound.play();
      }, 200);

      setTimeout(() => {
        playerPokemon.classList.remove('player--attack');
        opponentPokemon.classList.remove('damage');
        reslove(true);
      }, 750);
    }

    if (attack.type === 'Fire') {
      opponentPokemon.classList.add('burns');

      setTimeout(() => {
        fireSound.play();
      }, 200);

      setTimeout(() => {
        opponentPokemon.classList.remove('burns');
        reslove(true);
      }, 1750);
    }

    if (attack.type === 'Grass') {
      opponentPokemon.classList.add('grass');
      grassSound.play();
      setTimeout(() => {
        opponentPokemon.classList.remove('grass');
        reslove(true);
      }, 2000);
    }

    if (attack.type === 'Water') {
      opponentPokemon.classList.add('water');
      waterSound.play();
      setTimeout(() => {
        opponentPokemon.classList.remove('water');
        reslove(true);
      }, 2000);
    }
  });
};

const opponentTackleAnimation = () => {
  const opponentPokemon = document.querySelector('.opponentPokemon img');
  const playerPokemon = document.querySelector('.playerPokemon img');

  opponentPokemon.classList.add('opponent--attacks');
  playerPokemon.classList.add('damage');

  setTimeout(() => {
    opponentPokemon.classList.remove('opponent--attacks');
    playerPokemon.classList.remove('damage');
  }, 750);
};

const fireAttack = (target) => {
  if (target === 'player') {
  } else {
    const opponentPokemon = document.querySelector('.opponentPokemon');
    const playerPokemon = document.querySelector('.playerPokemon img');

    playerPokemon.classList.add('burns');
  }
};
