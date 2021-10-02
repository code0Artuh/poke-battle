class Menu {
  constructor() {
    this.menu = defaultMenu;
    this.menuIdentifier = 'defaultMenu';
    this.menuTarget = document.querySelector('.menu');
    this.menuEvents = new MenuEvents();
    this.state = 0;
  }

  drawDefaultMenu(pokemon) {
    this.menuTarget.innerHTML = '';
    this.menu = defaultMenu.replace('#{pokemonName}', pokemon.name);
    this.menuIdentifier = 'defaultMenu';
    this.menuTarget.innerHTML = '';
    this.menuTarget.innerHTML = this.menu;
    this.menuEvents.defaultMenuEvents();
  }

  async drawCommentMenu(comment, timeout) {
    return new Promise((resolve, reject) => {
      const time = 2000 || timeout;
      this.menuTarget.innerHTML = '';
      this.menu = commentMenu.replace('#{text}', comment);
      this.menuIdentifier = 'defaultMenu';
      this.menuTarget.innerHTML = this.menu;
      setTimeout(() => {
        resolve(true);
      }, time || 2000);
    });
  }

  drawBagMenu() {
    let items = '';
    game.playerBag.forEach((el, index) => {
      items += `<p class="btn--attack" data-item-id=${index} data-item-quantity=${el.quantity} data-item-type=${el.name} data-item-info="${el.info}"  >${el.quantity}x ${el.name}</p>`;
    });
    items += `<p class="btn--attack" data-attack-type="button">Back</p>`;

    this.menuTarget.innerHTML = '';
    this.menu = bagMenu.replace('#{items}', items);
    this.menuIdentifier = 'bagMenu';
    this.menuTarget.innerHTML = this.menu;
    this.menuEvents.bagMenuEvents();
  }

  drawFightMenu(pokemon) {
    let attackList = '';
    pokemon.attacks.forEach((attack, index) => {
      if (attack.func === 'attack') {
        attackList += `<p class="btn--attack" data-attack-id=${index} data-attack-type=${attack.type}>${attack.name}</p>`;
      } else {
        attackList += `<p class="btn--attack" data-attack-id=${index} data-attack-type="button">${attack.name}</p>`;
      }
    });
    this.menuTarget.innerHTML = '';
    this.menu = fightMenu.replace('#{attacks}', attackList);
    this.menuIdentifier = 'fightMenu';
    this.menuTarget.innerHTML = this.menu;
    this.menuEvents.fightMenuEvents();
  }
}

const bagMenu = `
<div class="menu--fight-box">
  <div class="menu--fight-box-left">
    #{items}
  </div>
  <div class="menu--fight-box-right">
    <p class="attack--info">Info</p>
  </div>
</div>
`;

const defaultMenu = `
        <div class="menu--overview-box">
          <div class="menu--overview-box-left">
            <p>What should #{pokemonName} do?</p>
          </div
          <div class="menu--overview-box-right">
              <div class="btn btn--fight">
                  <p>FIGHT</p>
              </div>
                <div class="btn btn--bag">
                  <p>BAG</p>
                </div>
                <div class="btn btn--pokemon">
                  <p>POKéMON</p>
                </div>
                <div class="btn btn--run">
                  <p>RUN</p>
                </div>
              </div>
            </div>
        </div>
`;

const commentMenu = `
  <div class="menu--comment-box">
    <p>#{text}</p>
  </div>
`;

const fightMenu = `
  <div class="menu--fight-box">
    <div class="menu--fight-box-left">
      #{attacks}
    </div>
    <div class="menu--fight-box-right">
      <p class="attack--info">Type: Normal</p>
    </div>
  </div>
`;
