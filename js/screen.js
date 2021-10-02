class Screen {
  constructor() {
    this.screen;
    this.screenTarget = document.querySelector('.screen');
  }

  drawBlackScreen() {
    this.screenTarget.innerHTML = blackScreen;
  }

  drawFadeOutScreen() {
    this.screenTarget.insertAdjacentHTML('afterbegin', drawFadeOutScreen);

    setTimeout(() => {
      document.querySelector('.overlay-fade-out').remove();
    }, 500);
  }

  drawFadeInScreen() {
    this.screenTarget.insertAdjacentHTML('afterbegin', drawFadeInScreen);

    setTimeout(() => {
      document.querySelector('.overlay-fade-in').remove();
    }, 1500);
  }

  drawIntroScreen() {
    this.screenTarget.innerHTML = introScreen;
    const audio = new Audio('./sounds/gameboy_start.mp3');
    audio.volume = 0.2;
    game.sound = audio;
    game.sound.play();
  }

  drawWelcomeScreen() {
    game.lowHpSound.pause();
    this.screenTarget.innerHTML = welcomeScreen;
    const audio = new Audio('./sounds/opening.mp3');
    audio.volume = 0.1;
    game.sound = audio;
    game.battleSound.pause();
    game.sound.play();

    const listenToKey = () => {
      game.screen.drawChoosePokemonScreen();
      window.removeEventListener('click', listenToKey);
    };

    window.addEventListener('click', listenToKey);
  }

  drawChoosePokemonScreen() {
    game.lowHpSound.pause();
    this.screenTarget.innerHTML = choosePokemonScreen;
    document.querySelectorAll('.pokeball-wrapper').forEach((el) => {
      el.addEventListener('click', (ev) => {
        const pickedPokemon = ev.target.closest('div').getAttribute('data-pokemon');
        if (pickedPokemon === 'charmander') {
          game.playerPokemon = new Charmander('Ash');
        } else if (pickedPokemon === 'squirtle') {
          game.playerPokemon = new Squirtle('Ash');
        } else {
          game.playerPokemon = new Bulbasaur('Ash');
        }
        game.drawChooseDifficultyScreen();
      });
    });
  }

  drawChooseDifficultyScreen() {
    game.lowHpSound.pause();
    this.screenTarget.innerHTML = chooseDifficultyScreen;
    document.querySelectorAll('.trainer-wrapper').forEach((el) => {
      el.addEventListener('click', (ev) => {
        const difficulty = ev.target.closest('div').getAttribute('data-difficulty');
        if (difficulty === 'easy') {
          game.opponentTrainer = 'Mr. X';
          game.opponentPokemonArr = [
            new Rattata(game.opponentTrainer),
            new Geodude(game.opponentTrainer),
            new Jigglypuff(game.opponentTrainer),
          ];
          game.playerBag = [{ name: 'Potion', quantity: 3, energy: 50, info: 'Heals 50 hp' }];
          game.opponentBag = [{ name: 'Potion', quantity: 3, energy: 50 }];
          document.querySelector('.screen').style.backgroundImage = 'url("./images/arena-forrest.png")';
        } else if (difficulty === 'medium') {
          game.opponentTrainer = 'Garry';
          game.opponentPokemonArr = [
            new Poliwrath(game.opponentTrainer),
            new Gengar(game.opponentTrainer),
            new Gyarados(game.opponentTrainer),
          ];
          game.playerBag = [{ name: 'Potion', quantity: 4, energy: 50, info: 'Heals 50 hp' }];
          game.opponentBag = [{ name: 'Potion', quantity: 3, energy: 50 }];
          document.querySelector('.screen').style.backgroundImage = 'url("./images/arena-street.png")';
        } else {
          game.opponentTrainer = 'Bonnie';
          console.log(game.opponentTrainer);

          game.opponentPokemonArr = [
            new Venusaur(game.opponentTrainer),
            new Mewtu(game.opponentTrainer),
            new Glitch(game.opponentTrainer),
          ];
          game.playerBag = [{ name: 'Potion', quantity: 5, energy: 50, info: 'Heals 50 hp' }];
          game.opponentBag = [{ name: 'Potion', quantity: 3, energy: 50 }];
          document.querySelector('.screen').style.backgroundImage = 'url("./images/arena-final.png")';
        }
        game.drawBattleScreen();
      });
    });
  }

  drawBattleScreen() {
    this.screenTarget.innerHTML = screen;
    this.drawFadeOutScreen();

    game.sound.pause();
    game.battleSound.volume = 0.03;
    game.battleSound.play();
  }

  drawNextTrainerScreen() {
    this.screenTarget.innerHTML = nextTrainerScreen
      .replace('#{opponentTrainer}', game.opponentPokemon.trainer)
      .replace('#{pokemon}', game.opponentPokemon.name);

    document.querySelectorAll('.deciscion--btn').forEach((el) => {
      el.addEventListener('click', (ev) => {
        if (ev.target.innerHTML === 'Continue') {
          game.drawBattleScreen();
        } else {
          this.drawLostScreen();
        }
      });
    });
  }

  drawMasterWonScreen() {
    game.lowHpSound.pause();
    this.screenTarget.innerHTML = masterWonScreen;
    const audio = new Audio('./sounds/win.mp3');
    audio.volume = 0.2;
    game.sound = audio;
    game.battleSound.pause();
    game.sound.play();
  }

  drawWonScreen() {
    game.lowHpSound.pause();
    this.screenTarget.innerHTML = wonScreen;
    const audio = new Audio('./sounds/win.mp3');
    audio.volume = 0.2;
    game.sound = audio;
    game.battleSound.pause();
    game.sound.play();
  }

  drawLostScreen() {
    game.lowHpSound.pause();
    this.screenTarget.innerHTML = lostScreen;
  }
}
const drawFadeInScreen = `
    <div class="overlay-fade-in">
    </div>`;

const drawFadeOutScreen = `
    <div class="overlay-fade-out">
    </div>`;

const blackScreen = `
  <div class="black--screen">
    </div>
`;

const nextTrainerScreen = `
  <div class="welcome--box">
      <h1>Round Won</h1>
      <p style="width: 90%; text-align:center">#{opponentTrainer} chooses #{pokemon} to fight next</p>
      <div style="display:flex; gap: 60px">
        <h3 class="deciscion--btn">Continue</h3>
        <h3 class="deciscion--btn">Run away</h3>
      </div>
    </div>
`;

const lostScreen = `
  <div class="welcome--box">
      <h1>Oh no, you lost</h1>
      <h3 class="deciscion--btn" onclick="game.screen.drawWelcomeScreen();">Restart</h3>
  </div>
`;

const welcomeScreen = `
  <div class="welcome--box pointer">
      <h3>Welcome to Pokémon</h3>
      <p>Click your mouse to continue</p>
  </div>
`;

const choosePokemonScreen = `
  <div class="welcome--box">
      <h1>Choose your Pokémon</h1>
      <p style="margin-bottom: 40px" class="s1">Click the Pokémon of your choice</p>
      <div class="choose-pokemon-box">
      <div class="pokeball-wrapper" data-pokemon="charmander">
        <p>Charmander</p>
        <img class="choose--pokemon-pokeball" src="./images/pokeball.gif">
      </div>
      <div class="pokeball-wrapper" data-pokemon="squirtle">
        <p>Squirtle</p>
        <img class="choose--pokemon-pokeball" src="./images/pokeball.gif">
      </div>
        <div class="pokeball-wrapper" data-pokemon="bulbasaur">
          <p>Bulbasaur</p>
          <img class="choose--pokemon-pokeball" src="./images/pokeball.gif">
        </div>
        </div>
  </div>
`;

const chooseDifficultyScreen = `
  <div class="welcome--box">
      <h1>Choose Difficulty</h1>
      <p style="margin-bottom: 20px; width: 90%; text-align: center;">Click a Trainer to choose your difficulty</p>
      <div class="choose-pokemon-box">
      <div class="trainer-wrapper" data-difficulty="easy">
        <p>Easy</p>
        <img style="width:100px;" src="./images/trainer_2.gif">
        <p>Mr. X</p>
      </div>
      <div class="trainer-wrapper" data-difficulty="medium">
        <p>Middle</p>
        <img style="width:100px; margin-left: -20px" src="./images/garry.webp">
        <p>Garry</p>
      </div>
        <div class="trainer-wrapper" data-difficulty="hard">
          <p>Hard</p>
          <img style="width:100px;" src="./images/trainer_4.gif">
          <p>Bonnie</p>
        </div>
        </div>
  </div>
`;

const wonScreen = `
<div class="welcome--box">
    <h3>Congrats, you won!!!</h3>
    <img style="width:300px;" src="./images/pokemons.gif">
    <p>You're a super Pokémon Trainer</p>
</div>
`;

const masterWonScreen = `
<div class="welcome--box">
    <img style="width:100%; height: auto;" src="./images/drake.gif">
</div>
`;

const introScreen = `
<div style="width: 100%; height: 100%; background-color: #fff; z-index: 100">

<?xml version="1.0" encoding="utf-8" ?>
<svg class="GB" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 -100 1000 500" xml:space="preserve">

  <g id="GAMEBOY" transform="translate(80)">

    <g id="G">
      <path class="st0 letter G" d="M111.2,139.4l1.1-7.2l0,0l0.1-0.9l0-0.1l0,0l8-52.5H64.7l-4.2,27.5h23.3L81.5,121L57,122.6
	c-9.8-2.6-16.8-7.7-21.5-15.9c-4-7.7-5.8-15.6-4.9-24.5c1.2-12.4,7.2-23.6,18.7-33.6c10.3-9.1,23.6-14.2,39.4-16.3
	c15.2-2.3,28.5-0.7,39.7,4.2l4.4-29.4C100.6-4.6,69.6-0.8,39.7,17.6C10.3,35.6-2.5,63.1,1,99c0.9,10.5,4.9,20.1,11.7,28.5
	c6.8,8.4,15.4,14.5,25.7,19.1c10.5,4.7,21.5,6.5,33.1,5.8c12.8-0.7,24.5-4.4,35.9-10.7L111.2,139.4z" />
    </g>
    <g id="A" transform="translate(105)">
      <path class="st0 letter A" d="M121.7,118.5l-0.1,0.2L101.8,0.4H65L9.8,125L4.7,137l0.1,0l-4.4,9.8h31.3l20.1-43.6h34.5l7.7,43.6h32.6
	L121.7,118.5z M63.3,74.6l12.8-28.2l5.6,28.2H63.3z" />
    </g>
    <g id="M" transform="translate(210)">
      <polygon class="st0 letter M" points="164.1,1.1 127.7,1.1 93.6,81.1 78.9,1.1 49.1,1.1 31.9,53.7 31.9,53.7 1.5,147.4 33.9,147.4 60,65.7 
	76.8,147.4 97.1,147.4 136.3,56.9 140.3,147.4 170.2,147.4 "/>
    </g>
    <g id="E" transform="translate(380)">
      <polygon id="polygon22_2_" class="st0 letter E" points="107,0.8 23.7,0.8 0.3,147.1 84.1,147.1 89.5,116 36.7,116 40.9,89.9 86.7,89.9 
	91.6,58.4 45.4,58.4 49.3,32.3 102.1,32.3 "/>
    </g>
    <g id="B" transform="translate(510)">
      <path id="path28_2_" class="st0 letter B" d="M96.4,6.7c-5.8-3.7-11.7-5.6-17.3-5.6h-56L0,146.4h67.2c7.2,0,14.7-2.3,22.4-7
	s13.5-10.5,18.2-17.5c4.9-8.2,6.8-16.1,5.8-24.5c-0.9-9.1-5.8-17.7-14.5-25.9c17-17.5,21-34.1,12.1-49.9
	C107.8,15.8,102.9,10.6,96.4,6.7z M44.3,58.9L49,31.9h19.6c4.9,0,8.6,1.4,11.2,4.2c2.1,2.6,3,5.6,2.6,9.3c-0.5,3.7-2.3,6.8-5.1,9.3
	c-3.3,2.8-7.2,4.2-11.9,4.2H44.3l33.8,34.5c2.8,2.8,4.2,6.3,4,10.3c-0.2,4-2.1,7.2-5.6,10c-3.5,2.8-8.4,4.4-15.2,4.4l-26.4,0
	l4.7-29.4h25.2c5.6,0,10,1.6,13.3,4.7L44.3,58.9L44.3,58.9z"/>
    </g>
    <g id="o" transform="translate(625)">
      <path id="path26_2_" class="st0 letter O" d="M81.3,2c-17-4-32.7,0-47.8,11.7C18.3,24.8,8.5,40.9,3.3,61.2c-4.4,20.1-2.3,39,5.8,55.8
	c8.6,17.3,21,27.8,38,31.5c16.8,4,32.4,0,47.6-11.4C110,125.4,120,109.3,124.7,89c4.7-20.1,2.6-38.7-5.8-55.8S97.8,5.7,81.3,2
	L81.3,2z M78.7,31.1c8.2,3.3,13.3,10.7,16.1,21.7c2.8,11.2,2.1,22.9-1.9,35.2c-4,12.1-10.5,21.2-18.9,27.1c-8.6,6.3-16.8,7.5-24.5,4
	c-8.2-3.3-13.5-10.7-16.3-21.7c-3-11.4-1.9-23.1,2.1-35.2c4-11.9,10.5-21.2,18.9-27.5C62.4,28.8,70.8,27.4,78.7,31.1L78.7,31.1z"/>
    </g>
    <g id="Y" transform="translate(730)">
      <polygon id="polygon24_2_" class="st0 letter Y" points="118.5,0.6 83.5,0.6 53.6,48.5 35,0.6 0.4,0.6 36.1,77.9 25,146.9 55.3,146.9 
	64.4,86 "/>
    </g>
  </g>
  <g id="NINTENDO">
    <path class="N1" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3361" class="ps02" d="M 449.33391,388.73589 L 467.54235,388.73589 L 492.75402,429.51519 L 492.73943,388.73589 L 510.81655,388.73589 L 510.81655,447.21297 L 492.76861,447.21297 L 467.42562,406.43366 L 467.42562,447.21297 L 449.31932,447.21297 L 449.33391,388.73589"
    />
    <path class="T" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3363" class="ps02" d="M 609.10999,394.747 L 626.70564,394.747 L 626.70564,402.61106 L 636.21838,402.61106 L 636.21838,408.40333 L 626.70564,408.40333 L 626.72023,447.21297 L 609.0954,447.21297 L 609.10999,408.40333 L 599.55348,408.40333 L 599.55348,402.62565 L 609.12458,402.62565 L 609.10999,394.747"
    />
    <path class="I" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3365" class="ps02" d="M 520.88371,408.33038 L 538.46477,408.33038 L 538.46477,447.21297 L 520.88371,447.21297 L 520.88371,408.33038" />
    <path class="I" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3367" class="ps02" d="M 520.83994,388.7213 L 538.46477,388.7213 L 538.46477,400.67058 L 520.83994,400.67058 L 520.83994,388.7213 z " />
    <path class="O1" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3369" class="ps02" d="M 836.1172,427.45798 C 836.1172,427.45798 836.10261,433.33779 836.10261,435.68679 C 836.10261,441.88758 832.4405,444.44085 828.90969,444.44085 C 825.39348,444.44085 821.71678,441.88758 821.71678,435.68679 C 821.71678,433.33779 821.71678,427.31208 821.71678,427.31208 C 821.71678,427.31208 821.73137,421.549 821.73137,419.19999 C 821.73137,413.02839 825.40807,410.48971 828.90969,410.48971 C 832.42591,410.48971 836.10261,413.02839 836.10261,419.19999 C 836.10261,421.549 836.10261,425.91143 836.1172,427.47257 L 836.1172,427.45798 z M 829.0556,405.67498 C 814.85944,405.67498 803.34786,415.45034 803.34786,427.50175 C 803.34786,439.56776 814.85944,449.34312 829.0556,449.34312 C 843.25175,449.34312 854.74874,439.56776 854.74874,427.50175 C 854.74874,415.45034 843.25175,405.67498 829.0556,405.67498"
    />
    <path class="D" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3371" class="ps02" d="M 780.26633,388.73589 L 797.62854,388.73589 L 797.62854,447.21297 L 780.23715,447.21297 C 780.23715,447.21297 780.22256,445.31625 780.22256,444.96609 C 773.49653,449.18263 765.90969,449.16804 759.98611,446.4251 C 758.41038,445.68101 747.96388,440.67661 747.96388,427.137 C 747.96388,416.88017 757.6517,405.66039 770.31589,406.78383 C 774.48866,407.14858 777.46504,408.66595 780.26633,410.25627 C 780.26633,401.25418 780.26633,388.73589 780.26633,388.73589 z M 780.39765,427.5747 C 780.39765,427.5747 780.39765,422.68702 780.39765,420.62982 C 780.39765,414.60411 776.23947,413.07216 773.51112,413.07216 C 770.70983,413.07216 766.61001,414.60411 766.61001,420.62982 C 766.61001,422.61407 766.6246,427.54552 766.6246,427.54552 C 766.6246,427.54552 766.61001,432.40402 766.61001,434.47582 C 766.61001,440.47234 770.70983,442.04807 773.49653,442.04807 C 776.23947,442.04807 780.39765,440.47234 780.39765,434.47582 C 780.39765,431.96632 780.39765,427.5747 780.39765,427.5747"
    />
    <path class="N2" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3373" class="ps02" d="M 579.63801,406.5212 C 586.20355,406.34612 599.55348,410.6502 599.46594,426.04275 C 599.43676,428.78568 599.45135,447.19838 599.45135,447.19838 L 581.97242,447.19838 C 581.97242,447.19838 581.97242,424.10226 581.97242,421.66572 C 581.97242,418.28082 578.73342,414.50198 573.94787,414.50198 C 569.14773,414.50198 565.60234,418.28082 565.60234,421.66572 C 565.60234,423.3144 565.61693,447.19838 565.61693,447.19838 L 548.15259,447.19838 L 548.138,408.31579 L 565.61693,408.3012 C 565.61693,408.3012 565.58775,411.43807 565.61693,412.40101 C 568.97265,409.19119 573.83115,406.69629 579.63801,406.5212"
    />
    <path class="N3" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3375" class="ps02" d="M 722.54794,406.5212 C 729.12807,406.34612 742.46341,410.6502 742.36128,426.04275 C 742.34669,428.78568 742.36128,447.19838 742.36128,447.19838 L 724.89694,447.19838 C 724.89694,447.19838 724.89694,424.10226 724.89694,421.66572 C 724.89694,418.28082 721.64335,414.50198 716.8578,414.50198 C 712.07225,414.50198 708.51227,418.28082 708.51227,421.66572 C 708.51227,423.3144 708.52686,447.19838 708.52686,447.19838 L 691.06252,447.19838 L 691.07711,408.31579 L 708.52686,408.3012 C 708.52686,408.3012 708.51227,411.43807 708.52686,412.40101 C 711.89717,409.19119 716.74108,406.69629 722.54794,406.5212"
    />
    <path class="E" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3377" class="ps02" d="M 652.60305,421.88457 C 652.57387,418.47049 652.64682,416.19443 653.77025,414.25395 C 655.14172,411.86118 657.66581,410.70856 659.95645,410.70856 L 659.94186,410.70856 C 662.2471,410.70856 664.77118,411.86118 666.14265,414.25395 C 667.2515,416.19443 667.30986,418.47049 667.28068,421.88457 L 652.60305,421.88457 z M 667.22232,433.615 C 667.22232,433.615 667.23691,433.77549 667.23691,435.96401 C 667.23691,443.08397 662.55349,444.6597 659.95645,444.6597 C 657.35942,444.6597 652.60305,443.08397 652.60305,435.96401 C 652.60305,433.83385 652.61764,427.93946 652.61764,427.93946 C 652.61764,427.93946 685.73714,427.95405 685.73714,427.93946 C 685.73714,415.87345 674.09425,405.87924 659.79596,405.87924 C 645.49767,405.87924 633.89855,415.6546 633.89855,427.72061 C 633.89855,439.77202 645.49767,449.54738 659.79596,449.54738 C 671.6577,449.54738 681.6811,442.77758 684.74502,433.60041 L 667.22232,433.615"
    />
    <path class="copyright" style="fill: rgb(232, 54, 213); fill-opacity: 1; fill-rule: nonzero; stroke: none;" id="path3379" class="ps02" d="M 857.49168,393.08373 C 860.33675,393.08373 861.75199,394.04668 861.75199,395.95798 C 861.75199,397.27109 860.93494,398.26321 859.56347,398.59879 L 861.79576,403.06335 L 859.09659,403.06335 L 857.19988,398.97813 L 856.00349,398.97813 L 856.00349,403.06335 L 853.58154,403.06335 L 853.58154,393.08373 L 857.49168,393.08373 z M 857.27283,389.18818 C 852.29761,389.18818 848.27074,393.22963 848.27074,398.19026 C 848.27074,403.16548 852.29761,407.19235 857.27283,407.19235 C 862.24805,407.19235 866.27492,403.16548 866.27492,398.19026 C 866.27492,393.22963 862.24805,389.18818 857.27283,389.18818 z M 864.55328,398.19026 C 864.55328,402.21713 861.2851,405.47072 857.27283,405.47072 C 853.24596,405.47072 849.99237,402.21713 849.99237,398.19026 C 849.99237,394.17799 853.24596,390.90981 857.27283,390.90981 C 861.2851,390.90981 864.55328,394.17799 864.55328,398.19026 z M 856.00349,397.51912 L 857.19988,397.51912 C 858.58594,397.51912 859.24249,397.09601 859.24249,396.10388 C 859.24249,395.06798 858.52758,394.61569 857.06857,394.61569 L 856.00349,394.61569 L 856.00349,397.51912"
    />
  </g>
  <g id="overlay">
	<polygon class="overlay0" points="1119.6,454 -0.4,454 138.4,0 1258.4,0 	"/>
	<polygon class="overlay1" points="700.3,455 186.6,455 278.3,1 792,1 	"/>
	<polygon class="overlay1" points="989,455 475.3,455 567,1 1080.7,1 	"/>
	<polygon class="overlay2" points="822.3,454 308.6,454 400.3,0 914,0 	"/>
	<circle class="overlay3" cx="778" cy="180" r="79"/>
</g>
  <defs>
    <clipPath id="clipPathG">
      <g id="G">
      <path class="letter G clip" d="M111.2,139.4l1.1-7.2l0,0l0.1-0.9l0-0.1l0,0l8-52.5H64.7l-4.2,27.5h23.3L81.5,121L57,122.6
  c-9.8-2.6-16.8-7.7-21.5-15.9c-4-7.7-5.8-15.6-4.9-24.5c1.2-12.4,7.2-23.6,18.7-33.6c10.3-9.1,23.6-14.2,39.4-16.3
  c15.2-2.3,28.5-0.7,39.7,4.2l4.4-29.4C100.6-4.6,69.6-0.8,39.7,17.6C10.3,35.6-2.5,63.1,1,99c0.9,10.5,4.9,20.1,11.7,28.5 c6.8,8.4,15.4,14.5,25.7,19.1c10.5,4.7,21.5,6.5,33.1,5.8c12.8-0.7,24.5-4.4,35.9-10.7L111.2,139.4z" />
      </g>
    </clipPath>
    <clipPath id="clipPathA">
      <g id="A" transform="translate(105)">
        <path class="st0 letter A" d="M121.7,118.5l-0.1,0.2L101.8,0.4H65L9.8,125L4.7,137l0.1,0l-4.4,9.8h31.3l20.1-43.6h34.5l7.7,43.6h32.6
  L121.7,118.5z M63.3,74.6l12.8-28.2l5.6,28.2H63.3z" />
      </g>
    </clipPath>
    <clipPath id="clipPathM">
      <g id="M" transform="translate(210)">
        <polygon class="st0 letter M" points="164.1,1.1 127.7,1.1 93.6,81.1 78.9,1.1 49.1,1.1 31.9,53.7 31.9,53.7 1.5,147.4 33.9,147.4 60,65.7 
  76.8,147.4 97.1,147.4 136.3,56.9 140.3,147.4 170.2,147.4 " />
      </g>
    </clipPath>
    <clipPath id="clipPathE">
      <g id="E" transform="translate(380)">
        <polygon id="polygon22_2_" class="st0 letter E" points="107,0.8 23.7,0.8 0.3,147.1 84.1,147.1 89.5,116 36.7,116 40.9,89.9 86.7,89.9 
  91.6,58.4 45.4,58.4 49.3,32.3 102.1,32.3 " />
      </g>
    </clipPath>
    <clipPath id="clipPathB">
      <g id="B" transform="translate(510)">
        <path id="path28_2_" class="st0 letter B" d="M96.4,6.7c-5.8-3.7-11.7-5.6-17.3-5.6h-56L0,146.4h67.2c7.2,0,14.7-2.3,22.4-7
  s13.5-10.5,18.2-17.5c4.9-8.2,6.8-16.1,5.8-24.5c-0.9-9.1-5.8-17.7-14.5-25.9c17-17.5,21-34.1,12.1-49.9
  C107.8,15.8,102.9,10.6,96.4,6.7z M44.3,58.9L49,31.9h19.6c4.9,0,8.6,1.4,11.2,4.2c2.1,2.6,3,5.6,2.6,9.3c-0.5,3.7-2.3,6.8-5.1,9.3
  c-3.3,2.8-7.2,4.2-11.9,4.2H44.3l33.8,34.5c2.8,2.8,4.2,6.3,4,10.3c-0.2,4-2.1,7.2-5.6,10c-3.5,2.8-8.4,4.4-15.2,4.4l-26.4,0
  l4.7-29.4h25.2c5.6,0,10,1.6,13.3,4.7L44.3,58.9L44.3,58.9z" />
      </g>
    </clipPath>
    <clipPath id="clipPathO">
      <g id="o" transform="translate(625)">
        <path id="path26_2_" class="st0 letter O" d="M81.3,2c-17-4-32.7,0-47.8,11.7C18.3,24.8,8.5,40.9,3.3,61.2c-4.4,20.1-2.3,39,5.8,55.8
  c8.6,17.3,21,27.8,38,31.5c16.8,4,32.4,0,47.6-11.4C110,125.4,120,109.3,124.7,89c4.7-20.1,2.6-38.7-5.8-55.8S97.8,5.7,81.3,2
  L81.3,2z M78.7,31.1c8.2,3.3,13.3,10.7,16.1,21.7c2.8,11.2,2.1,22.9-1.9,35.2c-4,12.1-10.5,21.2-18.9,27.1c-8.6,6.3-16.8,7.5-24.5,4
  c-8.2-3.3-13.5-10.7-16.3-21.7c-3-11.4-1.9-23.1,2.1-35.2c4-11.9,10.5-21.2,18.9-27.5C62.4,28.8,70.8,27.4,78.7,31.1L78.7,31.1z" />
      </g>
    </clipPath>
    <clipPath id="clipPathY">
      <g id="Y" transform="translate(730)">
        <polygon id="polygon24_2_" class="st0 letter Y" points="118.5,0.6 83.5,0.6 53.6,48.5 35,0.6 0.4,0.6 36.1,77.9 25,146.9 55.3,146.9 
  64.4,86 " />
      </g>
    </clipPath>
  </defs>
</svg>

</div>
`;

const screen = `
          <div class="player--stats-box">

          </div>
          <div class="opponent--stats-box">
          </div>
          
          <div class="menu">
          </div>
`;
