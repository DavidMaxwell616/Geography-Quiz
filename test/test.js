var config = {
  type: Phaser.AUTO,
  parent: 'phaser-test',
  width: 800,
  height: 600,
  backgroundColor: '#5273AD',
  scene: {
    preload: preload,
    create: create,
  },
};
const REGION = 'Europe';
var countries = []
var game = new Phaser.Game(config);
var regionData;
var countryData;
var region;
var loadingComplete;
var countryImages;
var countryText;
var worldImage;

const countryArray = [1,
  10,
  100,
  102,
  104,
  106,
  108,
  110,
  112,
  114,
  116,
  118,
  12,
  120,
  122,
  124,
  126,
  128,
  130,
  132,
  134,
  136,
  138,
  14,
  140,
  142,
  144,
  146,
  148,
  150,
  152,
  154,
  156,
  158,
  16,
  160,
  162,
  164,
  166,
  168,
  170,
  172,
  174,
  176,
  178,
  18,
  180,
  182,
  184,
  186,
  188,
  190,
  192,
  194,
  196,
  198,
  2,
  20,
  200,
  202,
  204,
  206,
  208,
  210,
  212,
  214,
  216,
  218,
  22,
  220,
  222,
  224,
  226,
  228,
  230,
  232,
  234,
  236,
  238,
  24,
  240,
  242,
  244,
  246,
  248,
  250,
  252,
  254,
  256,
  258,
  26,
  260,
  262,
  264,
  266,
  268,
  270,
  272,
  274,
  276,
  278,
  28,
  280,
  282,
  284,
  286,
  288,
  290,
  292,
  294,
  296,
  30,
  300,
  310,
  311,
  312,
  313,
  314,
  315,
  316,
  317,
  318,
  319,
  32,
  321,
  328,
  34,
  36,
  38,
  4,
  40,
  42,
  44,
  46,
  48,
  50,
  52,
  54,
  56,
  58,
  6,
  60,
  62,
  64,
  66,
  68,
  70,
  72,
  74,
  76,
  78,
  8,
  80,
  82,
  84,
  86,
  88,
  90,
  92,
  94,
  96,
  98
  ];

function preload() {
  loadingComplete = false;
  showLoader(this);
  this.load.path = '../assets/shapes/';
  
  this.load.path = '../assets/';
  this.load.json('countryData', 'json/countryData.json');
  this.load.json('regionData', 'json/regionData.json');
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
   // this.scale.pageAlignHorizontally = true;
  // this.scale.pageAlignVertically = true;
  // this.scale.refresh();
  countryArray.forEach(country => {
    this.load.svg(country, 'shapes/'+country+'.svg', { scale: 2.5 });
  });
  
}


function drawWorld(game) {
   worldImage = game.scene.add.image(region.x,region.y, 1).setOrigin(0.5);

}

function drawCountry(game,country) {
   var countryImage = game.scene.add.image(country.x,country.y, country.key).setOrigin(0.5);
    countryImage.name = country.key;
     countryImage.setInteractive({ draggable: true })
    .on('drag', function(pointer, dragX, dragY){
    countryImage.setPosition(dragX, dragY);
        var text = countryText;
        //var gameObjects = countryText.getMatching(countryImage.countryID, country.name)[0];
      //  console.log(countryText);
    })
    .on('dragend', function(pointer, dragX, dragY, dropped){
      country.x = countryImage.x;
      country.y = countryImage.y;
      let children = countryText.getChildren();
    let child = children.filter(e => e.countryID === country.name)[0];
     child.x = country.x;
     child.y = country.y;
     countries.forEach(country => {
       console.log(country.key,country.name,country.x,country.y)
     });
    })
    countryImages.add(countryImage);
   var text = game.scene.make.text({
    x: country.x-country.name.length*3,
    y: country.y,
    text: country.name,
    style: {
      font: '18px monospace',
      fill: '#000000'
    }
 //   });
  //let url = '../assets/shapes/' + country.key + '.svg';
  //game.scene.load.image(country.key, url, { scale: 2 });
  //game.scene.load.once('complete', () => {
  //console.log(country.name,country.x,country.y);
     //var src = scene.textures.get(key).getSourceImage();

    //var canvas = scene.textures.createCanvas('map_' + key, src.width, src.height).draw(0, 0, src);
    // var data = canvas.imageData;
    // console.log(data);
    // var img = new Image();
    // img.src = data;
  // var img = game.scene.add.image(country.x-region.centerX, country.y-region.centerY, country.key).setScale(3).setOrigin(0);;
   // canvas.refresh();

    // var pixel = new Phaser.Display.Color();
    // var xOffset = country.x;
    // for (var y = 0; y < src.height; y++) {
    //   for (var x = 0; x < src.width; x++) {
    //     canvas.getPixel(x, y, pixel);
    //     if (pixel.a > 0) {
    //       scene.add.rectangle(x + 33, y + 63, 1, 1, pixel.color);
    //     }
    //   }
    // }
 // });

});
text.countryID = country.name;
countryText.add(text);
}

function create() {
  countryData = this.cache.json.get('countryData');
  regionData = this.cache.json.get('regionData');
  countries = countryData.filter(word => word.region == REGION);
  region = regionData.filter(word => word.region == REGION)[0];
  countryImages = this.add.group();
  countryText = this.add.group();
  start = this.make.text({
        x: this.game.config.width / 3,
        y: this.game.config.height /2.5,
        text: 'START!',
        style: {
          font: '80px IMPACT',
          fill: '#FFA500'
        }
      });

  start.name = 'start';
  start.setInteractive();
  this.input.on('gameobjectdown', onObjectClicked);
}

function onObjectClicked(pointer, gameObject) {
  if (gameObject.name == 'start') {
    drawWorld(this);
      countries.forEach(country => {
      drawCountry(this,country);
    });
    start.visible = false;
  }
}

function showLoader(game) {
  var progressBar = game.add.graphics();
  var progressBox = game.add.graphics();
  var width = game.cameras.main.width;
  var height = game.cameras.main.height;
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(width/3, 270, 320, 50);
  game.load.on('progress', function (value) {});

  game.load.on('fileprogress', function (file) {});

  game.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
  });
  game.load.on('progress', function (value) {
    progressBar.clear();
    progressBar.fillStyle(0xffff00, 1);
    progressBar.fillRect(width/3+10, 280, 300 * value, 30);
    percentText.setText(parseInt(value * 100) + '%');
  });

   var loadingText = game.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);

  var percentText = game.make.text({
    x: width/3.5,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
}