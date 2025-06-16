import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  usuario = '';
  password = '';
  error = '';
  currentYear = new Date().getFullYear();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('login');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login');
  }

  login(): void {
    this.auth.login(this.usuario, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => this.error = 'Credenciales inválidas'
    });
  }
}
