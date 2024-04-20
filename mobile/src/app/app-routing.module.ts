/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { NavigationPage } from './navigation/navigation.page';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: NavigationPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'reservation',
        loadChildren: () => import('./pages/reservation/reservation.module').then( m => m.ReservationPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'work-order',
        loadChildren: () => import('./pages/work-order/work-order.module').then( m => m.WorkOrderPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
    data: {
      auth: true
    }
  },
  {
    path: 'org-login',
    loadChildren: () => import('./pages/auth/org-login/org-login.module').then( m => m.OrgLoginPageModule),
    data: {
      auth: true
    }
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule),
    data: {
      auth: true
    }
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
