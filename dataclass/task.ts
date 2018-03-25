export class Task {

  public title:string;
  public description:string;

	public date:string;
	public completedDate:string;
	public difficulty:string;
	public requesterID:string;
	public state:string; // completed, in-progress, open
	
  constructor(title,description,date,difficulty,requesterID){
		this.title=title;
		this.description=description;
		this.date=date;
		this.difficulty=difficulty
		this.requesterID=requesterID;
  }

   getData(): object {
     const result = {};
     Object.keys(this).map(key => result[key] = this[key]);
     return result;
   }
}
