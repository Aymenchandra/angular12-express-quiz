import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [  
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:"launch",component:LaunchComponent},
  {path:"quizz",component:QuizComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
