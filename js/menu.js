var _scene;
function mainMenuCreate(scene,config) {
_scene = scene;
    var menuX =config.width*.3;
  regions = countryData.map(item => item.region)
  .filter((value, index, self) => self.indexOf(value) === index)
  .sort(order);
  menuTitle = scene.add.text(menuX, 20, "Select Region:", { font: "62px Arial", fill: orange});

for (let index = 0; index < regions.length; index++) {
    var text = scene.add.text(menuX, 100+(index*30), regions[index], { font: "18px Arial", fill: orange});
    text.setInteractive();
    scene.input.on('gameobjectdown', onObjectClicked);
    menuText.push(text);
    }
  }

  function order(a, b) {
    return a < b ? -1 : (a > b ? 1 : 0);
}

function onObjectClicked(pointer,gameObject){
    selectedRegion = gameObject.text;
    StartGame();
}

function StartGame(){
  gameCreate(_scene);
  startGame = true;
  }