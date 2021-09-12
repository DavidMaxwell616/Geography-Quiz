var config = {
  width:800,
  height: 600,
  type: Phaser.AUTO,
  backgroundColor: '#5273AD',
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
const width = config.width;
const height = config.height;

var game = new Phaser.Game(config);
var scene;
  
function create() {
  scene = this;
  if (!startGame) mainMenuCreate(scene,game.config);
  else gameCreate();
}

function gameCreate(){
  region = regions.filter(word => word.region == selectedRegion)[0];
  countryImages = scene.add.group();
  countryText = scene.add.group();
   drawWorld(scene);
  region.countries.forEach(country => {
  drawCountry(scene,country);
  });
  menuBox = scene.add.graphics();
  menuBox.fillStyle(0x333333, 1);
  menuBox.fillRect(width*.6, height*.4, 450, 400);
  start = scene.make.text({
    x: width *.7,
    y: height *.4,
    text: 'START!',
    style: {
      font: '66px IMPACT',
      fill: '#FFA500'
    }
  });
  
start.name = 'start';
start.setInteractive();
  alertText = scene.make.text(
    width*.6,
    height / 2 - 100,
    '', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff0000',
    },
  );
  
  menuText = scene.make.text({
    x: width *.63,
    y: height *.6,
    text: '',
    style: {
      font: '26px Arial',
      fill: '#FFA500'
    }
  });
  
  alertText.visible = false;

  timerBox = scene.add.graphics();
  timerBar = scene.add.graphics();
  timerBar2 = scene.add.graphics();
  timerBox.fillStyle(0x111111, 1);
  timerBox.fillRect(
    width*.6,
    height - 40,
    325,
    30,
  );
  timerBar.fillStyle(0xff4500, 1);
  timerBar.fillRect(
    width *.61,
    height - 35,
    305,
    20,
  );
  timerBox.visible = false;
  timerBar.visible = false;
  timerBar2.visible = false;

}

function drawCountry(scene,country) {
  var countryImage = scene.add.image(country.x,country.y, country.key).setOrigin(0.5);
   countryImage.name = country.name;
    countryImage.setInteractive();
   countryImages.add(countryImage);
  var text = scene.make.text({
   x: country.x-country.name.length*3,
   y: country.y,
   text: country.name,
   style: {
     font: '18px monospace',
     fill: '#000000'
   }
});
text.countryID = country.name;
text.visible = false;
countryText.add(text);
}

function drawWorld(scene) {
  worldImage = scene.add.image(region.x,region.y, 1).setOrigin(0.5);
}

function showMenu(onOff){
   menuBox.visible = onOff;
  start.visible = onOff;
  menuText.visible = onOff;
  timerBar.visible = onOff;
  timerBar2.visible = onOff;
  timerBox.visible = onOff;
}

function onObjectClicked(pointer, gameObject) {
  if(!startGame) {
  selectedRegion = gameObject.text;
  StartGame(); 
  }
  else
  {
  if (gameObject.name == 'start') {
    alertText.setText('');
    startGame = true;
    menuText.setText(getMenuText());
    start.setText(selectedRegion);
    timerBox.visible = true;
    timerBar.visible = true;
    timerBar2.visible = true;
  } else 
  {
    if(gameObject.name==currentCountry){
      console.log('Match!');
    }
  }
}
}

function correctAnswer(game) {
  alertText.visible = true;
  alertText.setText('CORRECT!');
  alertText.setDepth(1);
  tmpCountry = country;
  game.scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      alertText.visible = false;
      timerCount = 0;
      attemptStarted = false;
      drawCountry(game, tmpCountry);
      wait = false;
      correctAnswers.push(country);
    },
    callbackScope: game.scene,
    loop: false,
  });
  wait = true;
}

function wrongAnswer(game) {
  alertText.visible = true;
  alertText.setText('INCORRECT!');
  alertText.setDepth(1);
  game.scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      alertText.visible = false;
    },
    callbackScope: game.scene,
    loop: false,
  });
}


function resizeMenu(upDown)
{

  if(upDown>0 && menu.scale<1){
     menu.setScale(menu.scale+upDown);
     menuShowing=false;
    }
  else
  menuShowing=true;
}

function getMenuText(){
  currentCountry = getCountry();
  return 'Find: ' +
  currentCountry.name +
  '\n\nAttempts left: ' +
  lives +
  '\n\nCorrect Answers: ' +
  region.correctAnswers + ' - ' + percent + '%';
}

function getCountry() {
  var rand =Phaser.Math.Between(2, region.countries.length);
  return region.countries[rand];
}

function update() {
if(!startGame || region.countries==null)
  return;
  if (lives > 0) {
  //  if (timerCount < 320) {
  //    console.log(timerCount);
  //     if (!attempt) {
  //       //randCountry = getCountry();
  //       // country = countryData[21];
  //       // console.log(country);
  //       attempt = true;
  //       timerCount = 0;
  //       timerBar2.clear();
  //       timerBar2.fillStyle(0x111111, 0.8);
  //     }
  //    if (!wait) {
  //       timerBar2.fillRect(
  //         width - timerCount,
  //         height - 35,
  //         timerCount,
  //         20,
  //       );
  //       timerCount++;
  //     }
  //   } else {
  //     attempt = false;
  //     lives--;
  //     timerCount = 0;
  //   }
  //      percent = (region.correctAnswers / region.countries.length * 100);
   }
}