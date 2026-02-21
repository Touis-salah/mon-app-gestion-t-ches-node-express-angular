import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // signal Angular moderne
  title = signal('Task Manager');

  // état sidebar responsive
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

// import { Component, signal } from '@angular/core';
// import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
//
// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, RouterLink, RouterLinkActive ],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('frontend');
//
//
// }
