const playerAttacks = async (ev) => {
  return new Promise(async (resolve, reject) => {
    let attack = { ...game.playerPokemon.attacks[ev.target.getAttribute('data-attack-id')] };

    let crit = false;

    if (attack.crit) {
      const indicator = Math.ceil(Math.random() * attack.crit);
      if (attack.crit === indicator) {
        attack.damage = attack.damage * 1.5;
        crit = true;
      }
    }

    if (
      (attack.type === 'Fire' && game.opponentPokemon.type === 'Grass') ||
      (attack.type === 'Water' && game.opponentPokemon.type === 'Rock') ||
      (attack.type === 'Grass' && game.opponentPokemon.type === 'Water')
    ) {
      crit = true;
      attack.damage = attack.damage * 1.5;
      console.log(attack.damage);
    }

    playerAttackAnimation(attack);
    game.opponentPokemon.receiveDamage(game.opponentPokemon, attack);

    if (!crit) {
      await game.menu.drawCommentMenu(
        `${game.playerPokemon.name} use ${attack.name} and makes damage of ${attack.damage} hp!`
      );
    } else {
      await game.menu.drawCommentMenu(
        `${game.playerPokemon.name} use ${attack.name} and makes CRITICAL damage of ${attack.damage} hp!`,
        3000
      );
    }

    if (game.opponentPokemon.health <= 0) {
      game.opponentPokemonArr.shift();

      if (game.opponentPokemonArr.length === 0 && game.opponentPokemon.trainer === 'Bonnie') {
        return game.screen.drawMasterWonScreen();
      }

      if (game.opponentPokemonArr.length === 0) return game.screen.drawWonScreen();
      document.querySelector('.screen').insertAdjacentHTML('afterbegin', "<div class='overlay-fade-in'></div>");

      game.opponentPokemon = game.opponentPokemonArr[0];
      game.drawNextTrainerScreen();
      return;
    }

    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

const opponentAttacks = async () => {
  if (game.opponentBag[0].quantity > 0 && game.opponentPokemon.healthPercent < 50) {
    if (Math.ceil(Math.random() * 2) === 2) {
      await game.opponentPokemon.restoreHealth(game.opponentPokemon, game.opponentBag);
      game.menu.drawDefaultMenu(game.playerPokemon);
      return;
    }
  }

  const randomNum = Math.floor(Math.random() * game.opponentPokemon.attacks.length);
  let attack = { ...game.opponentPokemon.attacks[randomNum] };

  attack.damage = Math.floor(attack.damage * (game.opponentPokemon.level / 100 + 1));

  let crit = false;

  if (attack.crit) {
    if (attack.crit === Math.ceil(Math.random() * attack.crit)) {
      attack.damage = Math.floor(attack.damage * 1.3);
      crit = true;
    }
  }

  game.playerPokemon.receiveDamage(game.playerPokemon, attack);

  opponentAttackAnimation(attack);

  if (!crit) {
    await game.menu.drawCommentMenu(
      `${game.opponentPokemon.name} use ${attack.name} and makes damage of ${attack.damage} hp!`
    );
  } else {
    await game.menu.drawCommentMenu(
      `${game.opponentPokemon.name} use ${attack.name} and makes CRITICAL damage of ${attack.damage} hp!`,
      3000
    );
  }

  if (game.playerPokemon.health > 0) return game.menu.drawDefaultMenu(game.playerPokemon);

  setTimeout(() => {
    game.screen.drawLostScreen();
  }, 500);
};
