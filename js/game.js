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

var game = new Phaser.Game(config);
var scene;
  
function create() {
  scene = this;
  countryData = this.cache.json.get('countryData');
  regionData = this.cache.json.get('regionData');
  if (!startGame) mainMenuCreate(scene,game.config);
  else gameCreate();
}

function gameCreate(){
  const width = scene.game.config.width;
  const height = scene.game.config.height;
  countries = scene.add.group();
  countries = countryData.filter(word => word.region == selectedRegion);
  region = regionData.filter(word => word.region == selectedRegion)[0];
  countryImages = scene.add.group();
  countryText = scene.add.group();
   drawWorld(scene);
  countries.forEach(country => {
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
    x: width *.65,
    y: height *.55,
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

}

function drawCountry(scene,country) {
  var countryImage = scene.add.image(country.x,country.y, country.key).setOrigin(0.5);
   countryImage.name = country.key;
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
    attemptStarted = false;
    start.setText(selectedRegion);
    console.log(menuText);
  } else if (attemptStarted && gameObject.name == 'background') {
    if (
      pointer.downX > country.x &&
      pointer.downX < country.x + country.width &&
      pointer.downY > country.y &&
      pointer.downY < country.y + country.height
    )
      correctAnswer(this);
    else wrongAnswer(this);
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
  const country = getCountry();
  return 'Find: ' +
  country.name +
  '\nAttempts left: ' +
  lives +
  '\nCorrect Answers: ' +
  correctAnswers + ' - ' + Math.floor(correctAnswers/countries.length) + '%';
}

function getCountry() {
  var rand =Phaser.Math.Between(2, countries.length);
  return countries[rand];
}

function update() {
if(!startGame || countries.length>0)
return;
  if (lives > 0) {
    if (timerCount < 320) {
      if (!attemptStarted) {
        randCountry = getCountry();
        // country = countryData[21];
        // console.log(country);
        attemptStarted = true;
        timerCount = 0;
        timerBar2.clear();
        timerBar2.fillStyle(0x111111, 0.8);
      }
      if (!wait) {
        timerBar2.fillRect(
         config.width / 2 + 250 - timerCount,
         config.height - 85,
          timerCount,
          20,
        );
        timerCount++;
      }
    } else {
      attemptStarted = false;
      lives--;
      timerCount = 0;
    }
    let percent = (correctAnswers.length / countryData.length * 100).toFixed(2);;
    menuText.setText(getMenuText);
    menuText.setFont('16px Arial');
  } else {
    alertText.visible = true;
    alertText.setText('GAME OVER!');
    scene.time.addEvent({
      delay: 5000, // ms
      callback: callback => {
        alertText.visible = false;
        scene.game.config.width / 2 - 100,
          scene.game.config.height * 0.8,
          menuText.setText('GEOGRAPHY QUIZ');
        menuText.setPosition(scene.game.config.width / 2 - 60,
          scene.game.config.height * 0.83);
        menuText.setFont('bold 32px Arial');
        start.visible = true;
        start.setInteractive();
        startGame = false;
        timerBox.visible = false;
        timerBar.visible = false;
        timerBar2.visible = false;
        lives = 5;
        correctAnswers = [];
        countries.clear(true);
      },
      callbackScope: game.scene,
      loop: false,
    });
  }
}