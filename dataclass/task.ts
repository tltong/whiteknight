export class Task {

  public title:string;
  public description:string;

	public date:string;
	public completedDate:string;
	public difficulty:string;
	public requesterEmail:string;
	public state:string; // completed, in-progress, open, draft
	
  constructor(title,description,difficulty,date,requesterEmail){
		this.title=title;
		this.description=description;
		this.date=date;
		this.difficulty=difficulty
		this.requesterEmail=requesterEmail;

    this.state = "open";
  }

   getData(): object {
     const result = {};
     Object.keys(this).map(key => result[key] = this[key]);
     return result;
   }
}
