'use strict'; // Selecting Elements

var score0El = document.getElementById('score--0');
var score1El = document.getElementById('score--1');
var current0El = document.getElementById('current--0');
var current1El = document.getElementById('current--1');
var name0El = document.getElementById('name--0');
var name1El = document.getElementById('name--1');
var diceEl = document.querySelector('.dice');
var player0El = document.querySelector('.player--0');
var player1El = document.querySelector('.player--1');
var playerEl = document.querySelector('.player');
var overlayEl = document.querySelector('.overlay');
var winnerEl = document.querySelector('.winner');
var winTextEl = document.querySelector('.win-text'); // Buttons selection

var btnNew = document.querySelector('.btn--new');
var btnRoll = document.querySelector('.btn--roll');
var btnHold = document.querySelector('.btn--hold');
var btnOverlay = document.querySelector('.btn-overlay'); // console.log(btnOverlay);
// Starting conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
var scores = [0, 0];
var current = 0;
var activePlayer = 0; // Roll btn fonctionality

btnRoll.addEventListener('click', function () {
  // Generating a random number 1 - 6
  var dice = Math.trunc(Math.random() * 6) + 1; // Display the dice

  diceEl.classList.remove('hidden');
  diceEl.src = "dice-".concat(dice, ".png"); // Check for rolled 1 : if true (current = 0) & switch to the next player

  if (dice !== 1) {
    // Add dice number to the current score
    current += dice;
    document.getElementById("current--".concat(activePlayer)).textContent = current;
  } else {
    // Switch to the next player
    current = 0;
    document.getElementById("current--".concat(activePlayer)).textContent = current;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
}); // New game button

function newGame() {
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current = 0;
  current0El.textContent = current;
  current1El.textContent = current;
  console.log('New Game');
  diceEl.classList.add('hidden');
  activePlayer = 0;

  if (!player0El.classList.contains('player--active')) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
}

btnNew.addEventListener('click', newGame); // Hold functionality

function hold() {
  scores[activePlayer] += current;
  current = 0;
  current0El.textContent = current;
  current1El.textContent = current;
  document.getElementById("score--".concat(activePlayer)).textContent = scores[activePlayer];
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active'); // winning at 100 points

  if (scores[0] >= 100) {
    overlayEl.classList.remove('hidden');
    winnerEl.classList.remove('hidden');
    winTextEl.textContent = 'The winner is player 1';
  } else if (scores[1] >= 100) {
    overlayEl.classList.remove('hidden');
    winnerEl.classList.remove('hidden');
    winTextEl.textContent = 'The winner is player 2';
  }
}

btnHold.addEventListener('click', hold); // Overlay new game

btnOverlay.addEventListener('click', function () {
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current = 0;
  current0El.textContent = current;
  current1El.textContent = current;
  console.log('New Game');
  diceEl.classList.add('hidden');
  activePlayer = 0;
  overlayEl.classList.add('hidden');
  winnerEl.classList.add('hidden');

  if (!player0El.classList.contains('player--active')) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
});