import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth-service';
import { filter, map, take } from 'rxjs';
import { isPlatformServer } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

    const platformId = inject(PLATFORM_ID);

  if(isPlatformServer(platformId)) return true;

  return auth.user$.pipe(
    filter((val) => val !== undefined),
    take(1),
    map((user) => {
      if (user === null) {
        return router.createUrlTree(['/login']);
      } else {
        return true;
      }
    })
  );
};
