var _scene;
function mainMenuCreate(scene,config) {
_scene = scene;
splashBox = _scene.add.graphics();
splashText = scene.add.group();
var menuX =config.width*.2;
splashBox.fillStyle(0x666666, 1);
splashBox.fillRect(menuX-20, 90, 450, 400);
regions = countryData.map(item => item.region)
  .filter((value, index, self) => self.indexOf(value) === index)
  .sort(order);
  menuTitle = scene.add.text(menuX, 100, "Select Region:", { font: "62px Impact", fill: orange});

for (let index = 0; index < regions.length; index++) {
    var text = scene.add.text(menuX, 200+(index*40), regions[index], { font: "18px Arial", fill: orange});
    text.setInteractive();
    scene.input.on('gameobjectdown', onObjectClicked);
    splashText.add(text);
    }
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