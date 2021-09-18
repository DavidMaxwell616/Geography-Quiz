var _scene;
function mainMenuCreate(scene,config) {
_scene = scene;
highScore = localStorage.getItem(localStorageName) == null ? 0 :
            localStorage.getItem(localStorageName);

splashText = scene.add.group();
splashBox = scene.add.rectangle(config.width/2, 320, 520, 500, 0x333333, 1);
countryData = _scene.cache.json.get('countryData');
regionData = _scene.cache.json.get('regionData');

regionData.forEach(region => {
  region.countries = [];
  var countries = countryData.filter(word => word.region == region.region);
  countries.forEach(country => {
    country.solved = false;
    region.countries.push(country);    
    });
  region.countryCount = region.countries.length;
  region.correctAnswers = 0;
  region.score = 0;
  regions.push(region);
});

// regions = countryData.map(item => item.region)
//   .filter((value, index, self) => self.indexOf(value) === index)
//   .sort(order);
  menuTitle = scene.add.text(config.width*.25, 100, "Select Region:", { font: "62px Impact", fill: orange});

updateStatsMenu();
highScoreText = scene.add.text(config.width*.2, 500, "High Score:" + highScore, { font: "32px Impact", fill: orange});
scoreText = scene.add.text(config.width*.5,500, "Total Score:" + score, { font: "32px Impact", fill: orange});

}

function updateStatsMenu(){
  var textY = 0;  
regions.forEach(region => {
  var regionText = region.region;
  var percent = (region.correctAnswers / region.countries.length * 100);
  var regionText2 = region.countryCount + ' countries, '+
                  percent + '% solved, score: '+
                  region.score;
      var text = scene.add.text(config.width*.22, 200+(textY*40), regionText, { font: "18px Arial", fill: percent==100 ? green : orange});
      var text2 = scene.add.text(config.width*.22+150, 200+(textY*40), regionText2, { font: "18px Arial", fill: percent==100 ? green : orange});
      text.setInteractive();
      scene.input.on('gameobjectdown', onObjectClicked);
      splashText.add(text);
      splashText.add(text2);
      textY++;
});
}



function order(a, b) {
    return a < b ? -1 : (a > b ? 1 : 0);
}

function StartGame(){
  splashBox.visible = false;
  menuTitle.visible = false;
  splashText.clear(true,true);
  gameCreate(_scene);
  startGame = true;
  }