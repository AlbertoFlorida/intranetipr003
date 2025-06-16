import { Routes } from '@angular/router';
import { Datamatrix42Component } from './views/datamatrix42/datamatrix42.component';
import { HomeComponent } from './views/home/home.component';
import { DigitocontrolComponent } from './views/digitocontrol/digitocontrol.component';
import { PlanosComponent } from './views/planos/planos.component';
import { LoginComponent } from './views/login/login.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { ComprobadoresComponent } from './views/comprobadores/comprobadores.component';
import { PreformadoComponent } from './views/preformado/preformado.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'datamatrix42', component: Datamatrix42Component, canActivate: [authGuard] },
  { path: 'digitocontrol', component: DigitocontrolComponent, canActivate: [authGuard] },
  { path: 'planos', component: PlanosComponent, canActivate: [authGuard] },
  { path: 'comprobadores', component: ComprobadoresComponent, canActivate: [authGuard] },
  { path: 'preformado', component: PreformadoComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] }
];
