import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from '../../services/authservice';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import {CommonModule} from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private auth: AuthService, private router: Router) {}
  @Input() isSidebarOpen = false;
  @Output() sidebarToggled = new EventEmitter<void>();

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggled.emit();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // get username() {
  //   return this.auth.getUsername();
  // }
}
