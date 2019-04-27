import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  BASE_URL = "http://localhost:4201/"

  initialJobs: any = [];
  jobs = [];
  jobsSubject = new Subject();

  constructor(private httpClient:HttpClient) { }

  getJobs() {
    return <Observable<any[]>>this.httpClient.get(this.BASE_URL + 'api/jobs')
      .pipe(map(response => response))
      .pipe(tap(data => this.initialJobs = data));
  }

  addJobs(jobData) {
    jobData.id = Date.now();
    // this.jobs = [jobData, ...this.jobs];
    // return this.jobsSubject.next(jobData);

    return this.httpClient.post(this.BASE_URL + 'api/jobs', jobData)
                          .pipe(map(response => response))
                          .pipe(tap(data => {
                            console.log(data)
                            this.initialJobs.next(jobData);
                          }));
  }

  getJobById(id) {
    return this.httpClient.get(this.BASE_URL + `api/jobs/${id}`)
    .pipe(map(response => response));
  }
}
