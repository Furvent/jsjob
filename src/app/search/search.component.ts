import { Component, OnInit } from '@angular/core';
import { JobService } from "../service/job.service";

@Component({
  selector: 'furv-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs: any = [];

  constructor(private jobService: JobService) { }

  ngOnInit() {
  }

  searchJobs(searchData) {
    this.jobService.searchJobs(searchData).subscribe(
                      data => this.jobs = data,
                      error => console.log(error)
                    )
  }

}
