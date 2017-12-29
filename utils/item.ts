export class Item {
  artist: string;
  
  title: string;

  constructor(artist, title){
    this.artist=artist;
	this.title=title;
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}
