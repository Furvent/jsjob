import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  initialJobs: any = [];
  jobs = [];
  jobsSubject = new Subject();

  constructor(private httpClient:HttpClient) { }


  // A REVOIR, CODE INCOMPREHENSIBLE POUR MOI POUR L'INSTANT
  getJobs() {
    // On a à la fois des données de data/jobs.json et des données ajoutées par notre formulaire
    if (this.jobs.length > 0 && this.initialJobs.length > 0) {
      return of([...this.jobs, ...this.initialJobs]);
    // On pas encore récupéré de data depuis data/jobs.json
    } else if (this.jobs.length > 0 && this.initialJobs.length <= 0) {
      return <Observable<any[]>>this.httpClient.get('data/jobs.json')
      .pipe(map(response => response))
      .pipe(tap(data => {
        this.initialJobs = data;
        this.jobs = [...this.jobs, ...this.initialJobs]
      }));
    // On a des jobs récupérés de data/jobs.json
    } else {
      return <Observable<any[]>>this.httpClient.get('data/jobs.json')
      .pipe(map(response => response))
      .pipe(tap(data => this.initialJobs = data));
    }
    
    
  }

  addJobs(jobData) {
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
    return this.jobsSubject.next(jobData);
  }
}
