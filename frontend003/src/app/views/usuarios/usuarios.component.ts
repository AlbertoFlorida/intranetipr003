import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, Usuario } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  editandoUsuario: string | null = null;

  nuevoUsuarioActivo: boolean = false;

  nuevoUsuario: Usuario = {
    usuario: '',
    email: '',
    password: '',
    roles: ['ROLE_USER']
  };

  errorCreacion: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  editar(user: Usuario): void {
    if (this.editandoUsuario && this.editandoUsuario !== user.usuario) {
      alert('Guarda o cancela los cambios antes de editar otro usuario.');
      return;
    }
  
    this.editandoUsuario = user.usuario;
    this.nuevoUsuarioActivo = false;
    this.errorCreacion = '';
    user.nuevaPassword = '';
  }

  guardar(user: Usuario): void {
    const { usuario, email, roles, nuevaPassword } = user;
    const usuarioEditado: any = { email, roles };

    if (nuevaPassword && nuevaPassword.trim() !== '') {
      usuarioEditado.password = nuevaPassword;
    }

    this.userService.updateUsuario(usuario, usuarioEditado).subscribe({
      next: () => {
        this.editandoUsuario = null;
      },
      error: err => {
        console.error('Error al guardar:', err);
        alert(err?.error?.detail || 'Ocurrió un error al guardar el usuario.');
      }
    });
  }

  cancelar(): void {
    this.editandoUsuario = null;
  }

  eliminar(usuario: string): void {
    if (confirm(`¿Seguro que quieres eliminar a "${usuario}"?`)) {
      this.userService.deleteUsuario(usuario).subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.usuario !== usuario);
      });
    }
  }

  actualizarRol(user: Usuario, rol: string, checked: boolean): void {
    if (checked && !user.roles.includes(rol)) {
      user.roles.push(rol);
    } else if (!checked) {
      user.roles = user.roles.filter(r => r !== rol);
    }
  }

  getCheckboxChecked(event: Event): boolean {
    return (event.target as HTMLInputElement)?.checked ?? false;
  }

  activarNuevoUsuario(): void {
    if (this.editandoUsuario) {
      alert('Guarda o cancela la edición actual antes de crear un nuevo usuario.');
      return;
    }
    this.nuevoUsuarioActivo = true;
    this.errorCreacion = '';
  }


  cancelarNuevoUsuario(): void {
    this.nuevoUsuarioActivo = false;
    this.nuevoUsuario = {
      usuario: '',
      email: '',
      password: '',
      roles: ['ROLE_USER']
    };
  }

  crearUsuario(): void {
    if (!this.nuevoUsuario.usuario || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      this.errorCreacion = 'Todos los campos son obligatorios.';
      return;
    }

    this.userService.createUsuario(this.nuevoUsuario).subscribe({
      next: (res) => {
        this.usuarios.push(res);
        this.cancelarNuevoUsuario();
      },
      error: err => {
        console.error(err);
        this.errorCreacion = err?.error?.detail || 'No se pudo crear el usuario.';
      }
    });
  }
}
