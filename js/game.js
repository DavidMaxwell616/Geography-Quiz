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
  menuBox = scene.add.rectangle(width*.9, height*.7, 450, 400, 0x333333, 1);
  start = scene.make.text({
    x: width *.65,
    y: height *.4,
    text: '   START!',
    style: {
      font: '66px IMPACT',
      fill: '#FFA500',
    }
  });
  
start.name = 'start';
start.setInteractive();

alertText = scene.make.text({
    x: width *.3,
    y: height *.4,
    text: '',
    style: {
      font: '66px IMPACT',
      fill: '#ff0000'
    },
  });
  
  menuText = scene.make.text({
    x: width *.63,
    y: height *.52,
    text: '',
    style: {
      font: '26px Arial',
      fill: '#FFA500'
    }
  });
  
  alertText.visible = false;

  timerBox = scene.add.rectangle(width*.81, height - 40, 300, 30, 0x111111, 1);
  timerBar = scene.add.rectangle(width *.82, height - 39,300, 20, 0xff4500, 1);
 
  timerBox.visible = false;
  timerBar.visible = false;
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
  timerBox.visible = onOff;
  worldImage.visible = onOff;
  splashBox.visible = !onOff;
  menuTitle.visible = !onOff;
  if(!onOff)
    {
      score = regions.reduce((n, {score}) => n + score, 0);
      updateStatsMenu();
      highScoreText.visible = !onOff;
      scoreText.visible = !onOff;
        highScoreText.setText("High Score:" + highScore);
      scoreText.setText("Total Score:" + score);
      if(score>highScore){
    highScore = score;
    localStorage.setItem(localStorageName, highScore);
   }
    }
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
    start.setFont('44px IMPACT');
    timerBox.visible = true;
    timerBar.visible = true;
    roundStarted = true;
  } else 
  {
    if(gameObject.name==currentCountry){
      if(!alertText.visible)
           correctAnswer();
    }
  }
}
}

function correctAnswer() {
  alertText.visible = true;
  alertText.setText('CORRECT!');
  alertText.setDepth(1);
  _scene.time.addEvent({
  delay: 2000, // ms
  callback: callback => {
      alertText.visible = false;
      var ctryImg = countryImages.getChildren().filter(x=> x.name == currentCountry)[0];
      ctryImg.destroy();
      var index = region.countries.findIndex((obj => obj.name == currentCountry));
      region.countries[index].solved = true;
      region.correctAnswers++;
      region.score+=timerCount;
      if(region.countries.filter(x=> !x.solved).length==0)
        {
          showMenu(false);
          startGame=false;
          return;
        }
      currentCountry = getCountry();
      roundStarted = true;
      timerBar.width = timerCount = TIMER_COUNT;
      menuText.setText(getMenuText());
      wait = false;
    },
    callbackScope: _scene,
    loop: false,
  });
  wait = true;
}

function wrongAnswer(game) {
  alertText.visible = true;
  alertText.setText('INCORRECT!');
  alertText.setDepth(1);
  _scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      alertText.visible = false;
      currentCountry = getCountry();
      roundStarted = true;
      menuText.setText(getMenuText());
      timerBar.width = timerCount = TIMER_COUNT;
      wait = false;
    },
    callbackScope: game.scene,
    loop: false,
  });
}

function timeOut(game) {
  alertText.visible = true;
  alertText.setText('TIME OUT!');
  alertText.setDepth(1);
  _scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      currentCountry = getCountry();
      roundStarted = true;
      timerBar.width = timerCount = TIMER_COUNT;
      menuText.setText(getMenuText());
      timerCount = TIMER_COUNT;
      wait = false;
      alertText.visible = false;
    },
    callbackScope: game.scene,
    loop: false,
  });
}

function getMenuText(){
 var percent = (region.correctAnswers / region.countries.length * 100);
 currentCountry = getCountry();
  return 'Find: ' +
  currentCountry +
  '\n\nAttempts left: ' +  lives +
  '\n\nCorrect Answers: ' + percent + '%' +
  '\n\nScore: ' + region.score;
}

function getCountry() {
  var countries = region.countries.filter(x=> !x.solved);
  var rand = Phaser.Math.Between(0, countries.length-1);
  return countries[rand].name;
}

function update() {
if(!startGame || region.countries==null)
  return;

  if(lives==0)
  startGame = false;
    if(roundStarted)
{
   if(!wait){
    //timerBar2.setDepth(1);
    
    timerBar.width--;
      timerCount--;
      if(timerBar.width==0){
        roundStarted=false;
        lives--;
        timeOut(this);
      }
  
  }
  }
 
}