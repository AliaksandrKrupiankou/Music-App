import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout-component/main-layout-component';
import { PlaylistPage } from './pages/playlist-page/playlist-page';
import { SearchPage } from './pages/search-page/search-page';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'playlist',
                component: PlaylistPage,
            },
            {
                path: '',
                component: SearchPage,
            }

        ]
    }
];
