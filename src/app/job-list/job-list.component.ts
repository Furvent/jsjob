import { Component, OnInit } from '@angular/core';

import { JobService } from "../service/job.service";

@Component({
  selector: 'furv-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs = [];
  error = "Failed to load jobs in job-list component";

  constructor(private jobService:JobService) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(
      data => {
        this.jobs = data;
      },
      error => {
        console.log(error);
        this.error = error;
      }
    );
  }

}
