export class Member {

  public name:string;
  public gender:string;
  public dob:string;
  public email:string;
  public description:string;
  public docID:string;
  public storageID:string;

  constructor(name:string,gender:string,dob:string,email:string){
    this.name=name;
    this.gender=gender;
    this.dob=dob;
    this.email=email;
  }

   getData(): object {
     const result = {};
     Object.keys(this).map(key => result[key] = this[key]);
     return result;
   }
}
