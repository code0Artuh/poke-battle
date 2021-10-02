const game = new Game();

// • Render • //
game.drawBlackScreen();

document.querySelector('.start-btn-overlay').addEventListener('click', (ev) => {
  document.querySelector('.black--screen').remove();
  document.querySelector('.welcome-introduction').remove();
  document.querySelector('.pointer-arrow').remove();
  game.drawIntroScreen();
  document.querySelector('.start-btn-overlay').remove();
  document.querySelector('.container').classList.add('big-device');
  document.querySelector('.power-btn').style.fill = '#26c426';

  setTimeout(() => {
    game.drawWelcomeScreen();
  }, 2500);
});
