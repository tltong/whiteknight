export class Photo {

  public photoString:string;

  constructor(photoString:string){
    this.photoString=photoString;
  }

   getData(): object {
     const result = {};
     Object.keys(this).map(key => result[key] = this[key]);
     return result;
   }
}
