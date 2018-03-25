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

  constructTask(title,description,date,difficulty,requesterID):Task {
		return new Task(title,description,date,difficulty,requesterID);
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
