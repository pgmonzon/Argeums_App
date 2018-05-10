import { Route,RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';



export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      canActivate: [AuthGuard], //added canActivate and AuthGuard service

      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      canActivate: [AuthGuard], //added canActivate and AuthGuard service

      children: [
          {
        path: '',
        canActivate: [AuthGuard], //added canActivate and AuthGuard service
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
        path: 'personal',
        canActivate: [AuthGuard], //added canActivate and AuthGuard service
        loadChildren: './components/components.module#ComponentsModule'
    },{
        path: 'forms',
        loadChildren: './forms/forms.module#Forms'
    }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule'
    }, {
        path: 'clientes',
        loadChildren: './widgets/widgets.module#WidgetsModule'
    }, {
        path: 'trafico',
        loadChildren: './trafico/charts.module#ChartsModule'
    }, {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    }, {
        path: 'viajes',
        loadChildren: './viajes/timeline.module#TimelineModule'
    }
    , {
        path: 'transportistas',
        loadChildren: './widgets/widgets.module#WidgetsModule'
    }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
export const appRoutingProviders: any[] = [AuthGuard];

