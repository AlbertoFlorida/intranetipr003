import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, SidebarComponent, FooterComponent, HeaderComponent]
})
export class AppComponent {
  showSidebar = false;
  showHeader = false;

  constructor(
    private router: Router,
    public auth: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isLogin = event.urlAfterRedirects === '/login';
        this.showSidebar = this.auth.isLoggedIn() && !isLogin;
        this.showHeader = this.auth.isLoggedIn() && !isLogin;
        document.body.classList.toggle('login', isLogin);
      }
    });
  }

}
