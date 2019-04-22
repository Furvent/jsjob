import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient:HttpClient) { }

  getJobs() {
    return this.httpClient.get<any>('data/jobs.json').pipe();
  }
}
