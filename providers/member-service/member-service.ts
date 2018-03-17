import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataServicesProvider } from '../../providers/data-services/data-services';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { Member } from '../../dataclass/member';

@Injectable()
export class MemberServiceProvider {

  constructor(private ds:DataServicesProvider, private ps:PhoneServiceProvider ) {
  }

  constructMember(name:string,gender:string,dob:string,email:string):Member {
    return new Member(name,gender,dob,email);
  }
}
