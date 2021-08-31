class MainScene extends Phaser.Scene {
  constructor(){
    super('mainScene');
  }

  preload(){
      this.scale = 5;
    
      const jsonURL = 'https://gist.githubusercontent.com/jjcapellan/a2009ae23bae05fda37addb97b2779aa/raw/d9164580f525a9f296e99a632fb1e85e31d28807/atlas.json';
      const svgURL = 'https://gist.githubusercontent.com/jjcapellan/a2009ae23bae05fda37addb97b2779aa/raw/d9164580f525a9f296e99a632fb1e85e31d28807/atlas.svg';
      this.loadAtlasSVG('atlas', svgURL, jsonURL, this.scale);
  }// End preload

  create(){
      this.add.image(400,300, 'atlas', 'circle');
      this.add.image(10,10,'atlas','spiral').setOrigin(0);
      this.add.image(790, 10, 'atlas', 'penta').setOrigin(1,0);
      this.add.image(10, 590, 'atlas', 'a').setOrigin(0,1);
      this.add.image(790, 590, 'atlas', 'triangle').setOrigin(1,1);

      this.add.text(400,560, `Scale: ${this.scale}X`, {fontSize: 20}).setOrigin(0.5);
  }//End create
  
  
  loadAtlasSVG(key, svgURL, jsonURL, scale){
      scale = scale || 1;
    
      this.load.svg(key, svgURL, {scale: scale});
      this.load.json(key, jsonURL);

      this.load.on('complete', () => {
          const jsonData = this.cache.json.get(key);
          const frameKeys = Object.keys(jsonData.frames);

          frameKeys.forEach( frameKey => {
            const frame = jsonData.frames[frameKey].frame;
            for(const prop in frame){
              frame[prop] = frame[prop] * scale;
            }
          });

          // For JSON Array format you must use JSONArray function
          Phaser.Textures.Parsers.JSONHash(this.textures.get(key), 0, jsonData);
      });
  }

}// End class

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x999999,
    parent: 'phaserdiv',
    scene: [MainScene],
    loader: {
    crossOrigin: "anonymous"
  }
};

var game = new Phaser.Game(config);