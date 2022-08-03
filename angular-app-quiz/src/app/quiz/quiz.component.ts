import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  } from '@sweetalert2/ngx-sweetalert2';

import { interval } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';



interface questions{
  question:String;
  answers:Array<String>;
}


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  
  questions1 : questions = {
    question : "What is my favorite cake?",
    answers:["snapcake","white cake","choclate cake","nothing"]
  } 
  questions2 : questions = {
    question : "what is my favorite country?",
    answers:["Libanon","Algeria","Tunisia","Palestaine"]
  } 
  questions3 : questions = {
    question : "Who's the best football player?",
    answers:["cr7","messi","neymar","Mbappé"]
  } 
  questions4 : questions = {
    question : "what is my favorite juce?",
    answers:["orange juce","kiwi juce","manga juce","banana juce"]
  } 
  questions5 : questions = {
    question : "what is my favorite language?",
    answers:["Python","HTML","CSS","JAVASCRIPT"]
  } 
  questions6 : questions = {
    question : "What is my favorite cake?",
    answers:["snapcake","white cake","choclate cake","nothing"]
  } 
  questions7 : questions = {
    question : "what is my favorite country?",
    answers:["Libanon","Algeria","Tunisia","Palestaine"]
  } 
  questions8 : questions = {
    question : "Who's the best football player?",
    answers:["cr7","messi","neymar","Mbappé"]
  } 
  questions9 : questions = {
    question : "what is my favorite juce?",
    answers:["orange juce","kiwi juce","manga juce","banana juce"]
  } 
  
  
  
  Allquestion : questions[] = [this.questions1,this.questions2,this.questions3,this.questions4,this.questions5,this.questions6
    ,this.questions7,this.questions8,this.questions9]
  
  i=0;
  correct=0;
  buttonDisabled:boolean = false;
  second: number = 59;
  minute: number = 59;
  maxtime: number = 60;
  ids:string = `road${this.i+1}`
  constructor( private router: Router ) {}

  ngOnInit(){
    
    interval(1000).subscribe(()=>{
      
      this.second -= 1
      this.maxtime -=1
      if(this.minute == 0 && this.second == 0)
      {
        this.router.navigateByUrl("/launch")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonText: 'Relaunch Quizz',
          cancelButtonText:'EXIT',
          showCancelButton: true,
          text: `Time is up! Result of your test ${this.correct}/${this.Allquestion.length}`,
        }).then((result)=>{
          if(result.isConfirmed)
        {
          location.reload();
        }
        else
        {
          this.router.navigateByUrl("/launch")
        }
        })
      } 
      else if(this.second <= 0)
      {
        this.minute -= 1
        this.second = 60
      }
      if(this.maxtime <= 0)
      {
        this.SkipQuestion() ;
      }
      
     
    })
    
    
    this.currentQuestion()
    
    
    
  }

  CheckAnswer(idname:any,answer:any)
  {
    this.buttonDisabled = true;
    let elem: HTMLElement = document.getElementById(idname)!;
    let questionList: HTMLElement = document.getElementById(this.ids)!;

    if(answer == 'cr7' || answer == 'snapcake' || answer == 'Palestaine' || answer == 'kiwi juce' || answer == 'HTML' )
    {
      elem.style.backgroundColor = "green";
      questionList.style.backgroundColor = "green"
      this.correct +=1
    }
    else
    {
      elem.style.backgroundColor = "red";
      questionList.style.backgroundColor = "red";
    }
    this.nextQuestion(idname);
  }
  
  nextQuestion(idname:any)
  {
    let elem: HTMLElement = document.getElementById(idname)!;
    elem.style.backgroundColor = "rgba(95, 95, 95, 0.795)";
    this.i+= 1;
    this.maxtime = 60;
    this.buttonDisabled = false;
    this.ids = `road${this.i+1}`

    this.currentQuestion()
    
  }
  
  SkipQuestion()
  {
    let questionList: HTMLElement = document.getElementById(this.ids)!;
    questionList.style.backgroundColor = "red";
    this.i +=1;
    this.maxtime = 60;
    this.ids = `road${this.i+1}`
    this.currentQuestion()
    
  }  

  currentQuestion()
  {
    if(this.i < 9)
    {
      let questionList: HTMLElement = document.getElementById(this.ids)!;
      questionList.style.backgroundColor = "rgb(158, 158, 4)";
    }
    else
    {
      Swal.fire({
        title: `Result of your test ${this.correct}/${this.Allquestion.length}`,
        confirmButtonText: 'Relaunch Quizz',
        cancelButtonText:'EXIT',
        showCancelButton: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result)=>{
        if(result.isConfirmed)
        {
          location.reload();
        }
        else
        {
          this.router.navigateByUrl("/launch")
        }
      })
    }
  }

  confirmBox(){
    
  }

  confirmSkip()
  {
    Swal.fire({
      title: 'Are you sure?<br>That jump will be a incorrect question!!',
      showCancelButton: true,
      confirmButtonText: 'NEXT',
      icon: 'warning',
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.SkipQuestion()
      } 
    })
  }
  
  confirmExit()
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You will certainly leave this tour!',
      showCancelButton: true,
      confirmButtonText: 'EXIT',
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
    }).then((result)=>{
      if(result.isConfirmed)
      {
        Swal.fire('Sorry ,We Hope you enjoy our quiz next time 🥺🥺', '', 'info')
        this.router.navigateByUrl("/launch")
      }
      else
      {
        Swal.fire("We are glad you don't let that happen! 😍😍", '', 'success')
      }
    })
  }
  confirmResult()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to answer the remaining questions !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, skip it!'
    }).then((result) => {
      if (result.isConfirmed) 
      {
        Swal.fire(`Result of your test ${this.correct}/${this.Allquestion.length}`,'','success')
        this.router.navigateByUrl("/launch")
      }
    })
  }
}
