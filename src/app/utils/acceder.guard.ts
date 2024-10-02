import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccederGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const IDRol = Number(localStorage.getItem('IDRol'));

    // Verificar si el usuario está autenticado
    if (!token) {
      this.router.navigate(['/acceder']); // Redirigir al login si no está autenticado
      return false;
    }

    // Verificar los roles permitidos para la ruta
    const allowedRoles = route.data['allowedRoles'] as number[];
    if (allowedRoles && allowedRoles.includes(IDRol)) {
      return true;
    }

    // Si no tiene acceso, redirigir a una página de acceso denegado
    this.router.navigate(['/acceso-denegado']);
    return false;
  }
}
