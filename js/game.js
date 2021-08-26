var config = {
  width:1000,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: '#5273AD',
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var _scene;
  
function create() {
  _scene = this;
  countryData = this.cache.json.get('countryData');
  if (!startGame) mainMenuCreate(_scene,game.config);
  else gameCreate();
}



function gameCreate(scene){

  console.log(selectedRegion);
  alertText = scene.add.text(
    scene.game.config.width / 2 - 40,
    scene.game.config.height / 2 - 100,
    '', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff0000',
    },
  );
  alertText.visible = false;

  timerBox = scene.add.graphics();
  timerBar = scene.add.graphics();
  timerBar2 = scene.add.graphics();
  timerBox.fillStyle(0x111111, 1);
  timerBox.fillRect(
    scene.game.config.width / 2 - 70,
    scene.game.config.height - 90,
    320,
    30,
  );
  timerBar.fillStyle(0xff4500, 1);
  timerBar.fillRect(
    scene.game.config.width / 2 - 65,
    scene.game.config.height - 85,
    310,
    20,
  );
  timerBar.visible = false;
  timerBar2.visible = false;
  timerBox.visible = false;
  countries = scene.add.group();

  ShowRegion();
}

function ShowRegion(){
 
}



function update(){

}
// function showMenu(onOff){
//   menu.visible = onOff;
//   start.visible = onOff;
//   menuText.visible = onOff;
  
// }
// function onObjectClicked(pointer, gameObject) {
//   if (gameObject.name == 'start') {
//     alertText.setText('');
//     startGame = true;
//     timerBar.visible = true;
//     timerBar2.visible = true;
//     timerBox.visible = true;
//     let config = scene.scene.game.config;
//     menuText.y = config.height - 60;
//     start.visible = false;
//     attemptStarted = false;
//   } else if (attemptStarted && gameObject.name == 'background') {
//     if (
//       pointer.downX > country.x &&
//       pointer.downX < country.x + country.width &&
//       pointer.downY > country.y &&
//       pointer.downY < country.y + country.height
//     )
//       correctAnswer(this);
//     else wrongAnswer(this);
//   }
// }

// function correctAnswer(game) {
//   alertText.visible = true;
//   alertText.setText('CORRECT!');
//   alertText.setDepth(1);
//   tmpCountry = country;
//   game.scene.time.addEvent({
//     delay: 2000, // ms
//     callback: callback => {
//       alertText.visible = false;
//       timerCount = 0;
//       attemptStarted = false;
//       drawCountry(game, tmpCountry);
//       wait = false;
//       correctAnswers.push(country);
//     },
//     callbackScope: game.scene,
//     loop: false,
//   });
//   wait = true;
// }

// function wrongAnswer(game) {
//   alertText.visible = true;
//   alertText.setText('INCORRECT!');
//   alertText.setDepth(1);
//   game.scene.time.addEvent({
//     delay: 2000, // ms
//     callback: callback => {
//       alertText.visible = false;
//     },
//     callbackScope: game.scene,
//     loop: false,
//   });
// }

// function drawCountry(game, tmpCountry) {
//   // console.log(country.x, country.y);
//   // console.log(country);
//   let scene = game.scene;
//   let key = country.file;
//   let url = '../assets/shapes/' + key + '.svg';
//   scene.load.image(key, url);
//   scene.load.once('complete', () => {
//     //console.log(tmpCountry.country, tmpCountry.x, tmpCountry.y);
//     const img = scene.add.image(tmpCountry.x, tmpCountry.y, key).setOrigin(0.0, 0.0);
//     countries.add(img);
//     //scene.add.image(country.x, country.y, key).setOrigin(0.5, 0.5);
//   });

//   game.scene.load.start();

// }

// function resizeMenu(upDown)
// {

//   if(upDown>0 && menu.scale<1){
//      menu.setScale(menu.scale+upDown);
//      menuShowing=false;
//     }
//   else
//   menuShowing=true;
// }


// function getCountry() {
//   let rand = null;

//   while (rand === null || correctAnswers.includes(rand)) {
//     rand = countryData[Math.floor(Math.random() * countryData.length)];
//   }
//   return rand;
// }

// function update() {
// if(!startGame && !menuShowing)
// {
// showMenu(true);
// if(menu.scale<1 && !menuShowing)  
//   resizeMenu(.025);
// else
//   resizeMenu(-.025);
// }

//   return;
//   if (!startGame) return;
//   if (lives > 0) {
//     if (timerCount < 320) {
//       if (!attemptStarted) {
//         country = getCountry();
//         // country = countryData[21];
//         // console.log(country);
//         attemptStarted = true;
//         timerCount = 0;
//         timerBar2.clear();
//         timerBar2.fillStyle(0x111111, 0.8);
//       }
//       if (!wait) {
//         timerBar2.fillRect(
//           scene.game.config.width / 2 + 250 - timerCount,
//           scene.game.config.height - 85,
//           timerCount,
//           20,
//         );
//         timerCount++;
//       }
//     } else {
//       attemptStarted = false;
//       lives--;
//       timerCount = 0;
//     }
//     let percent = (correctAnswers.length / countryData.length * 100).toFixed(2);;
//     menuText.setText(
//       'Find: ' +
//       country.country +
//       '\nAttempts left: ' +
//       lives +
//       '\nCorrect Answers: ' +
//       correctAnswers.length + ' - ' + percent + '%',
//     );
//     menuText.setFont('16px Arial');
//   } else {
//     alertText.visible = true;
//     alertText.setText('GAME OVER!');
//     scene.time.addEvent({
//       delay: 5000, // ms
//       callback: callback => {
//         alertText.visible = false;
//         scene.game.config.width / 2 - 100,
//           scene.game.config.height * 0.8,
//           menuText.setText('GEOGRAPHY QUIZ');
//         menuText.setPosition(scene.game.config.width / 2 - 60,
//           scene.game.config.height * 0.83);
//         menuText.setFont('bold 32px Arial');
//         start.visible = true;
//         start.setInteractive();
//         startGame = false;
//         timerBox.visible = false;
//         timerBar.visible = false;
//         timerBar2.visible = false;
//         lives = 5;
//         correctAnswers = [];
//         countries.clear(true);
//       },
//       callbackScope: game.scene,
//       loop: false,
//     });
//   }
// }