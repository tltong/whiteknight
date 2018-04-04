import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataServicesProvider } from '../../providers/data-services/data-services';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { Task } from '../../dataclass/task';
import { Photo } from '../../dataclass/photo';

@Injectable()
export class TaskServiceProvider {

  constructor(private ds:DataServicesProvider, private ps:PhoneServiceProvider) {
  }

  constructTask(title,description,difficulty):Task {
    let date = new Date().toISOString();
    let requesterID = this.ds.getCurrentUserEmail();

    // default task state is 'open'
		return new Task(title,description,difficulty,date,requesterID);  
  }

  updateCompletedData(task:Task,date):Task {
    task.completedDate=date;
    return task;
  }

  updateState(task:Task,state):Task {
    task.state=state
    return task;
  }
}
