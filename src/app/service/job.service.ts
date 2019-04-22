import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobs = [];
  jobsSubject = new Subject();

  constructor(private httpClient:HttpClient) { }

  getJobs() {
    return this.httpClient.get<any>('data/jobs.json').pipe();
  }

  addJobs(jobData) {
    jobData.id = Date.now();
    return this.jobsSubject.next(jobData);
  }
}
