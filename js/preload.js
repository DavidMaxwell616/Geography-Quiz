function preload() {
  showLoader(this);
  this.load.path = '../assets/shapes/';
  
  this.load.path = '../assets/';
  this.load.json('countryData', 'json/countryData.json');
  this.load.json('regionData', 'json/regionData.json');
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
    countryArray.forEach(country => {
    this.load.svg(country, 'shapes/'+country+'.svg', { scale: 2.5 });
  });
  
}

function showLoader(game) {
  var progressBar = game.add.graphics();
  var width = game.cameras.main.width;
  var height = game.cameras.main.height;
  var progressBox = game.add.graphics();
   progressBox.fillStyle(0xffffff, .2);
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