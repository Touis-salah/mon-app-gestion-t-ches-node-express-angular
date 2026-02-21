import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskList implements OnInit {

  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', completed: false };

  // Pagination
  currentPage = 1;
  itemsPerPage = 6;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.setItemsPerPage();
    this.loadTasks();
  }

  // 🔹 Responsive items per page
  @HostListener('window:resize')
  onResize() {
    this.setItemsPerPage();
  }

  setItemsPerPage() {
    if (window.innerWidth < 640) this.itemsPerPage = 3;
    else if (window.innerWidth < 1024) this.itemsPerPage = 4;
    else this.itemsPerPage = 6;
  }

  // 🔹 Load tasks
  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // 🔹 Add task
  addTask() {
    if (!this.newTask.title.trim()) return;

    this.taskService.createTask(this.newTask).subscribe(task => {
      this.tasks.unshift(task);
      this.newTask = { title: '', description: '', completed: false };
      this.currentPage = 1;
      this.showToastMessage('Tâche ajoutée avec succès !');
    });
  }

  // 🔹 Delete task modal
  showConfirmModal = false;
  taskIdToDelete?: number;

  deleteTask(id?: number) {
    if (id === undefined) return;
    this.taskIdToDelete = id;
    this.showConfirmModal = true;
  }

  cancelDelete() {
    this.taskIdToDelete = undefined;
    this.showConfirmModal = false;
  }

  confirmDelete() {
    if (this.taskIdToDelete === undefined) return;

    this.taskService.deleteTask(this.taskIdToDelete).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== this.taskIdToDelete);
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;

      this.taskIdToDelete = undefined;
      this.showConfirmModal = false;

      this.showToastMessage('Tâche supprimée avec succès !');
    });
  }

  // 🔹 Toast notifications
  showToast = false;
  toastMessage = '';
  showToastMessage(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 4000);
  }

  // 🔹 Task info modal
  selectedTask: Task | null = null;
  isInfoOpen = false;

  showTaskInfo(task: Task) {
    this.selectedTask = task;
    this.isInfoOpen = true;
  }

  closeInfo() {
    this.isInfoOpen = false;
    this.selectedTask = null;
  }

  // 🔹 Toggle completed
  toggleCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      task.completed = updatedTask.completed;
    });
  }

  // 🔹 Pagination logic
  get totalPages(): number {
    return Math.ceil(this.tasks.length / this.itemsPerPage);
  }

  get paginatedTasks(): Task[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.tasks.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // 🔹 Edit task modal
  taskBeingEdited?: Task;
  showEditModal = false;

  editTask(task: Task) {
    this.taskBeingEdited = { ...task };
    this.showEditModal = true;
  }

  confirmUpdate() {
    if (!this.taskBeingEdited) return;

    this.taskService.updateTask(this.taskBeingEdited).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) this.tasks[index] = updatedTask;

        this.showEditModal = false;
        this.taskBeingEdited = undefined;
        this.showToastMessage('Tâche mise à jour avec succès !');
      },
      error: () => this.showToastMessage('Erreur lors de la mise à jour')
    });
  }
}


