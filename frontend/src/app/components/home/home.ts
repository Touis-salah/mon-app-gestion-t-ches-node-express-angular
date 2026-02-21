import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  progress = 0;
  recentTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.taskService.getTasks().subscribe(tasks => {

      this.totalTasks = tasks.length;

      this.completedTasks = tasks.filter(t => t.completed).length;

      this.pendingTasks = tasks.filter(t => !t.completed).length;

      this.progress = this.totalTasks
        ? Math.round((this.completedTasks / this.totalTasks) * 100)
        : 0;

      this.recentTasks = [...tasks]
        .reverse()
        .slice(0, 5);
    });
  }
}
