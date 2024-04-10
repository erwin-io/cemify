import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeaturesComponent } from './pages/features/features.component';
import { AuthComponent } from './auth/auth.component';;
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'map' },
  { path: 'auth', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'profile', pathMatch: 'full', redirectTo: 'profile/edit' },

  {
    path: '',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'map',
        canActivate: [AuthGuard],
        data: { title: 'Map' },
        loadChildren: () =>
          import('./pages/features/map/map.module').then(
            (m) => m.MapModule
          ),
      },
      {
        path: 'burial',
        canActivate: [AuthGuard],
        data: { title: 'Burial'},
        loadChildren: () =>
          import('./pages/features/burial/burial.module').then(
            (m) => m.BurialModule
          ),
      },
      {
        path: 'reservation',
        canActivate: [AuthGuard],
        data: { title: 'Reservation' },
        loadChildren: () =>
          import('./pages/features/reservation/reservation.module').then(
            (m) => m.ReservationModule
          ),
      },
      {
        path: 'work-order',
        canActivate: [AuthGuard],
        data: { title: 'Work Order' },
        loadChildren: () =>
          import('./pages/features/work-order/work-order.module').then(
            (m) => m.WorkOrderModule
          ),
      },
      {
        path: 'access',
        canActivate: [AuthGuard],
        data: { title: 'Access', group: 'User Management' },
        loadChildren: () =>
          import('./pages/features/access/access.module').then(
            (m) => m.AccessModule
          ),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        data: { title: 'Users', group: 'User Management' },
        loadChildren: () =>
          import('./pages/features/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'edit',
        data: { title: 'Edit profile', profile: true },
        loadChildren: () =>
          import('./pages/profile/edit-profile/edit-profile.module').then(
            (m) => m.EditProfileModule
          ),
      },
      {
        path: 'change-password',
        data: { title: 'Change Password', profile: true },
        loadChildren: () =>
          import(
            './pages/profile/change-password/change-password.module'
          ).then((m) => m.ChangePasswordModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        data: { title: 'Login' },
        loadChildren: () =>
          import('./auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        data: { title: 'Register' },
        loadChildren: () =>
          import('./auth/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
    ],
  },
  {
    path: 'no-access',
    component: NoAccessComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
