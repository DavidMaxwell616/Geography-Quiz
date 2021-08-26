function preload() {
  this.load.path = '../assets/shapes/';
  this.load.image('background', '1.svg');

  this.load.path = '../assets/';
  this.load.json('countryData', 'countryData.json');
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
  this.load.image('start', 'start.png');
  this.load.image('menu', 'dialog.png');

  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.scale.refresh();
}