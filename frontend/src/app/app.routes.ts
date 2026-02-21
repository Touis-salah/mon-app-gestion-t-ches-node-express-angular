import { Routes } from '@angular/router';
import {TaskList} from './components/task-list/task-list';
import {Home} from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tasks', component: TaskList },
  { path: '**', redirectTo: '' }
];
