import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './MyComponents/card/card.component';
import { CardDetailComponent } from './MyComponents/card-detail/card-detail.component';
import { Route404Component } from './MyComponents/404/404.component';
import { authGuard } from './MyServices/auth.guard';

export const routes: Routes = [
  {path: 'auth', loadComponent: ()=> import('./MyComponents/auth-page/auth-page.component').then(m => m.AuthPageComponent) },
  { path: '', component: CardComponent, canActivate: [authGuard] },
  { path: 'compound-detail/:cid', component: CardDetailComponent, canActivate: [authGuard] },
  { path: '**', component: Route404Component },
];
