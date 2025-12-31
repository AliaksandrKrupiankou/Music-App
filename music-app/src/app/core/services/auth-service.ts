import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  router = inject(Router);

  user = toSignal(authState(this.auth));

  login() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(() => this.router.navigate(['/']))
      .catch(error => console.error(error));
  }

  logout() {
    signOut(this.auth)
      .then(() => this.router.navigate(['/login']));
  }
}
