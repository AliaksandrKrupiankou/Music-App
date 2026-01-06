import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth-service';
import { filter, map, take } from 'rxjs';

export const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    filter((val) => val !== undefined),
    take(1),
    map((user) => {
      if (user) {
        return router.createUrlTree(['/']);
      } else {
        return true;
      }
    })
  );
};
