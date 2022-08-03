import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {}

  showLoading()
  {
    this.spinner.show(undefined, {
      type: 'square-jelly-box',
      size: 'medium',
      bdColor: 'rgba(128, 128, 128, 0.411)',
      color: 'white',
      fullScreen: true,
    });
    setTimeout(() => this.spinner.hide() , 5000);
    setTimeout(() => this.router.navigateByUrl("/quizz") , 5000);
    
  }

}
