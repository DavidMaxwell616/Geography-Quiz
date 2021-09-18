var _scene;
function mainMenuCreate(scene,config) {
_scene = scene;

splashText = scene.add.group();
splashBox = scene.add.rectangle(config.width/2, 290, 450, 400, 0x333333, 1);

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

var textY = 0;  
regions.forEach(region => {
  var regionText = region.region;
var regionText2 = region.countryCount + ' countries, '+
                  region.correctAnswers + ' solved, score: '+
                  region.score;
      var text = scene.add.text(config.width*.25, 200+(textY*40), regionText, { font: "18px Arial", fill: orange});
      var text2 = scene.add.text(config.width*.25+150, 200+(textY*40), regionText2, { font: "18px Arial", fill: orange});
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
  splashText.getChildren().forEach(child => {
    child.visible = false;
  });
  gameCreate(_scene);
  startGame = true;
  }