class Pokemon {
  constructor(trainer) {
    this.trainer = trainer;
  }

  receiveDamage(pokemon, attack) {
    pokemon.health = pokemon.health - attack.damage;
    if (pokemon.health <= 0) pokemon.health = 0;
    pokemon.healthPercent = (pokemon.health / pokemon.maxHealth) * 80;
    game.opponentStats.drawOpponentStats(game.opponentPokemon);
    game.playerStats.drawPlayerStats(game.playerPokemon);
  }

  async restoreHealth(pokemon, bag) {
    return new Promise(async (resolve, reject) => {
      const potion = bag[0];
      if (potion.quantity === 0) {
        await game.menu.drawCommentMenu(`No Potions`, 2000);
        return game.menu.drawDefaultMenu(game.playerPokemon);
      }

      potion.quantity--;
      pokemon.health = pokemon.health + potion.energy;
      if (pokemon.health >= pokemon.maxHealth) pokemon.health = pokemon.maxHealth;

      const healSound = new Audio('./sounds/heal.wav');
      healSound.volume = 0.2;
      healSound.play();
      pokemon.healthPercent = (pokemon.health / pokemon.maxHealth) * 80;
      game.opponentStats.drawOpponentStats();
      game.playerStats.drawPlayerStats();
      await game.menu.drawCommentMenu(
        `${pokemon.trainer} uses potion and heals ${potion.energy} hp of ${pokemon.name}`
      );
      resolve(true);
    });
  }

  updateStats() {}

  drawPokemon() {
    const screen = document.querySelector('.screen');

    const elementString = `
        <div class="playerPokemon" style="width: 100px; height: 100px; left: ${this.x}px; bottom: ${this.y}px;"">  
          <img src="./images/${this.img}" style="width: ${this.width}px;" alt="">
        </div>
`;
    screen.insertAdjacentHTML('beforeend', elementString);
  }

  drawOpponentPokemon() {
    const screen = document.querySelector('.screen');
    const elementString = `
        <div class="opponentPokemon" style="width: 100px; height: 100px; left: ${this.x}px; bottom: ${this.y}px;"">  
          <img src="./images/${this.img}" style="width: ${this.width}px;" alt="">
        </div>
`;
    screen.insertAdjacentHTML('beforeend', elementString);
  }
}

class Charmander extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Charmander';
    this.attacks = [
      { name: 'Tackle', func: 'attack', damage: 30, type: 'Normal', crit: 2 },
      { name: 'Ember', func: 'attack', damage: 40, type: 'Fire', crit: 2, image: 'ember.gif', sound: 'ember.wav' },
      { name: 'Scratch', func: 'attack', damage: 30, type: 'Normal', crit: 5, image: 'slash.gif' },
      { name: 'Back', func: 'button', type: 'Button' },
    ];
    this.type = 'Fire';
    this.health = 120;
    this.maxHealth = 120;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 15;
    this.width = 100;
    this.x = 65;
    this.y = 75;
    this.img = 'charmander_back.webp';
  }
}

class Squirtle extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Squirtle';
    this.attacks = [
      { name: 'Tackle', func: 'attack', damage: 30, type: 'Normal', crit: 2 },
      { name: 'Scratch', func: 'attack', damage: 30, type: 'Normal', crit: 4, image: 'slash.gif' },
      { name: 'Waterball', func: 'attack', damage: 40, type: 'Water', crit: 3, image: 'water.gif' },
      { name: 'Back', func: 'button', type: 'Button' },
    ];
    this.type = 'Water';
    this.health = 120;
    this.maxHealth = 120;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 15;
    this.width = 100;
    this.x = 65;
    this.y = 75;
    this.img = 'squirtle_back.gif';
  }
}

class Bulbasaur extends Pokemon {
  constructor(trainer) {
    super(trainer);

    this.name = 'Bulbasaur';
    this.attacks = [
      { name: 'Tackle', func: 'attack', damage: 30, type: 'Normal', crit: 2 },
      { name: 'Scratch', func: 'attack', damage: 40, type: 'Normal', crit: 3, image: 'slash.gif' },
      { name: 'Seed Bomb', func: 'attack', damage: 40, type: 'Grass', crit: 4, image: 'leaf_attack.gif' },
      { name: 'Back', func: 'button', type: 'Button' },
    ];
    this.type = 'Grass';
    this.health = 120;
    this.maxHealth = 120;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 15;
    this.width = 80;
    this.x = 95;
    this.y = 65;
    this.img = 'bulbasaur_back.webp';
  }
}

class Jigglypuff extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Jigglypuff';
    this.attacks = [
      { name: 'Tackle', damage: 20, type: 'Normal' },
      { name: 'Tackle', damage: 30, type: 'Normal' },
      { name: 'Pound', damage: 40, type: 'Normal' },
      { name: 'Slam', damage: 50, type: 'Normal' },
    ];
    this.type = 'Normal';
    this.health = 100;
    this.maxHealth = 100;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 11;
    this.width = 60;
    this.x = 295;
    this.y = 130;
    this.img = 'jigglypuff.gif';
  }
}

class Rattata extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Rattata';
    this.attacks = [
      { name: 'Tackle', damage: 10, type: 'Normal' },
      { name: 'Tackle', damage: 20, type: 'Normal' },
      { name: 'Bite', damage: 30, type: 'Normal' },
      { name: 'Crunch', damage: 40, type: 'Normal' },
    ];
    this.type = 'Normal';
    this.health = 100;
    this.maxHealth = 100;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 10;
    this.width = 50;
    this.x = 299;
    this.y = 138;

    this.img = 'rattata.gif';
  }
}

class Geodude extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Geodude';
    this.attacks = [
      { name: 'Sand', damage: 10, type: 'Normal' },
      { name: 'Headnut', damage: 20, type: 'Normal' },
      { name: 'Tackle', damage: 30, type: 'Normal' },
      { name: 'Explosion', damage: 40, type: 'Normal' },
    ];
    this.type = 'Rock';
    this.health = 100;
    this.maxHealth = 100;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 12;
    this.width = 100;
    this.x = 270;
    this.y = 128;
    this.img = 'geodude.gif';
  }
}

class Alakazam extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Alakazam';
    this.attacks = [
      { name: 'Kinesis', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Disable', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Kinesis', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Psychic', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Psy';
    this.health = 200;
    this.maxHealth = 200;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 20;
    this.width = 100;
    this.x = 280;
    this.y = 168;
    this.img = 'alakazam_front.gif';
  }
}

class Gengar extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Gengar';
    this.attacks = [
      { name: 'Curse', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Hex', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Lick', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Pulse', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Psy';
    this.health = 200;
    this.maxHealth = 200;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 15;
    this.width = 100;
    this.x = 284;
    this.y = 161;
    this.img = 'gengar.gif';
  }
}

class Aerodactyl extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Aerodactyl';
    this.attacks = [
      { name: 'Bite', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Slash', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Crunch', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Psybeam', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Normal';
    this.health = 200;
    this.maxHealth = 200;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 20;
    this.width = 200;
    this.x = 220;
    this.y = 215;
    this.img = 'aerodactyl.gif';
  }
}

class Gyarados extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Gyarados';
    this.attacks = [
      { name: 'Bite', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Slash', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Crunch', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Aqua Tail', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Water';
    this.health = 200;
    this.maxHealth = 200;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 21;
    this.width = 200;
    this.x = 220;
    this.y = 215;
    this.img = 'gyarados.gif';
  }
}

class Poliwrath extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Poliwrath';
    this.attacks = [
      { name: 'Bite', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Slash', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Crunch', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Aqua Tail', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Water';
    this.health = 200;
    this.maxHealth = 200;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 21;
    this.width = 125;
    this.x = 253;
    this.y = 181;

    this.img = 'poliwrath.gif';
  }
}

class Blastoise extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Blastoise';
    this.attacks = [
      { name: 'Tail', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Headnut', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Bite', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Blast', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Water';
    this.health = 200;
    this.maxHealth = 200;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 35;
    this.width = 120;
    this.x = 265;
    this.y = 178;

    this.img = 'blastoise.gif';
  }
}

class Venusaur extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Venusaur';
    this.attacks = [
      { name: 'Tail', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Headnut', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Bite', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Solar', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Grass';
    this.health = 200;
    this.maxHealth = 200;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 30;
    this.width = 120;
    this.x = 265;
    this.y = 178;

    this.img = 'venusaur.gif';
  }
}

class Mewtu extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Mewtu';
    this.attacks = [
      { name: 'Tackle', damage: 10, type: 'Normal', crit: 3 },
      { name: 'Disable', damage: 20, type: 'Normal', crit: 3 },
      { name: 'Swift', damage: 30, type: 'Normal', crit: 3 },
      { name: 'Amnesia', damage: 40, type: 'Animated', crit: 3 },
    ];
    this.type = 'Psy';
    this.health = 250;
    this.maxHealth = 250;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 33;
    this.width = 125;
    this.x = 295;
    this.y = 177;
    this.img = 'mewtu_front.gif';
  }
}

class Glitch extends Pokemon {
  constructor(trainer) {
    super(trainer);
    this.name = 'Glitch';
    this.attacks = [
      { name: 'Tackle', damage: 10, type: 'Normal', crit: 2 },
      { name: 'Swift', damage: 20, type: 'Normal', crit: 2 },
      { name: 'Ironhacker', damage: 40, type: 'Animated', crit: 2 },
      { name: 'Ironhacker', damage: 40, type: 'Animated', crit: 2 },
    ];
    this.type = 'psy';
    this.health = 120;
    this.maxHealth = 120;
    this.healthPercent = (this.health / this.maxHealth) * 80;
    this.level = 40;
    this.width = 100;
    this.x = 265;
    this.y = 208;
    this.img = 'glitch.gif';
  }
}
