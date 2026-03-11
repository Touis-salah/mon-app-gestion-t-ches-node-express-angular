import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { TaskList } from './components/task-list/task-list';
import {LoginComponent} from './components/logincomponent/logincomponent';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskList, canActivate: [authGuard] }, // <-- functional guard
  { path: '**', redirectTo: '' }
];

// import { Routes } from '@angular/router';
// import {TaskList} from './components/task-list/task-list';
// import {Home} from './components/home/home';
//
// export const routes: Routes = [
//   { path: '', component: Home },
//   { path: 'tasks', component: TaskList },
//   { path: '**', redirectTo: '' }
// ];
