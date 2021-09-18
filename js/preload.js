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
  var width = game.cameras.main.width;
  var height = game.cameras.main.height;
  progressBox = game.add.rectangle(width/2, 300, 320, 50, 0xffffff, .2);
  progressBar = game.add.rectangle(width/2+2, 300, 300, 30,0xffff00, 1);
 
   game.load.on('progress', function (value) {});

  game.load.on('fileprogress', function (file) {});

  game.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
  });
  game.load.on('progress', function (value) {
    progressBar.width = 300 * value;
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
    x: width/4,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
}