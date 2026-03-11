import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { TaskList } from './components/task-list/task-list';
import {LoginComponent} from './components/logincomponent/logincomponent';
import {authGuard} from './guards/auth-guard';
import {Register} from './components/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskList, canActivate: [authGuard] }, // <-- functional guard
  { path: '**', redirectTo: '' }
];
