class PlayerStats {
  constructor() {
    this.playerStats = playerStatsBox;
    this.playerStatsTarget = document.querySelector('.player--stats-box');
    this.playerStatsTarget.innerHTML = playerStatsBox;
  }

  drawPlayerStats() {
    game.lowHpSound.pause();
    game.lowHpSound.volume = 0.05;

    document.querySelector('.player--pokemon-name').innerHTML = game.playerPokemon.name;
    document.querySelector('.player--pokemon-health').innerHTML = game.playerPokemon.health;
    document.querySelector('.player--pokemon-level').innerHTML = game.playerPokemon.level;
    document.querySelector('.player--pokemon-max-health').innerHTML = game.playerPokemon.maxHealth;

    const healthBar = document.querySelector('.player--pokemon-health-bar');
    healthBar.style.width = `${game.playerPokemon.healthPercent}px`;
    healthBar.setAttribute('aria-valuenow', game.playerPokemon.healthPercent);

    if (game.playerPokemon.healthPercent > 50) {
      healthBar.style.background = `#25b527`;
    } else if (game.playerPokemon.healthPercent > 25) {
      healthBar.style.background = `#dad30c`;
    } else {
      game.lowHpSound.loop = true;
      game.lowHpSound.play();
      healthBar.style.background = `#e03c3c`;
    }
  }

  drawPlayerStatsEmpty() {
    this.playerStatsTarget.innerHTML = '';
  }
}

const playerStatsBox = `
<div class="player--stats-wrapper">
  <p class="player--pokemon-name"></p>
  <p class="player--pokemon-health"></p>
  <p class="player--pokemon-level"></p>
  <p class="player--pokemon-health-bar" role="progressbar"  aria-valuenow="80" aria-valuemin="0" aria-valuemax="80"></p>
  <p class="player--pokemon-max-health"></p>
</div>
`;

class OpponentStats {
  constructor() {
    this.opponentStats = opponentStatsBox;
    this.opponentStatsTarget = document.querySelector('.opponent--stats-box');
    this.opponentStatsTarget.innerHTML = opponentStatsBox;
  }

  drawOpponentStats() {
    document.querySelector('.opponent--pokemon-name').innerHTML = game.opponentPokemon.name;
    document.querySelector('.opponent--pokemon-level').innerHTML = game.opponentPokemon.level;

    const healthBar = document.querySelector('.opponent--pokemon-health-bar');
    healthBar.style.width = `${game.opponentPokemon.healthPercent}px`;
    healthBar.setAttribute('aria-valuenow', game.opponentPokemon.healthPercent);

    if (game.opponentPokemon.healthPercent > 50) {
      healthBar.style.background = `#25b527`;
    } else if (game.opponentPokemon.healthPercent > 25) {
      healthBar.style.background = `#dad30c`;
    } else {
      healthBar.style.background = `#e03c3c`;
    }
  }
}

const opponentStatsBox = `
  <div class="opponent--stats-wrapper">
    <p class="opponent--pokemon-name"></p>
    <p class="opponent--pokemon-level"></p>
    <p class="opponent--pokemon-health-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="80"></p>
  </div>
`;
