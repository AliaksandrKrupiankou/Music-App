import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout-component/main-layout-component';
import { PlaylistPage } from './pages/playlist-page/playlist-page';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'playlist',
                component: PlaylistPage,
            },

        ]
    }
];
