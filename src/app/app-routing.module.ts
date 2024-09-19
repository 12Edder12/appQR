import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/page-login/page-login.component';

const routes: Routes = [
   {
    path: '', component: PageLoginComponent,
   }, 
   {
    path: 'agency', loadChildren: () => import('./agency/agency.module').then(m => m.AgencyModule)
   },
   {
    path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
   },
   {
    path: 'channel', loadChildren: () => import('./channel/channel.module').then(m => m.ChannelModule)
   }, 
   {
    path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
   },
   {path: 'follow-up', loadChildren: () => import('./follow-up/follow-up.module').then(m => m.FollowUpModule)
   },
   {
    path: 'qr', loadChildren: () => import('./qr/qr.module').then(m => m.QrModule)
   },
   {
    path: '**', redirectTo: ''
   }

   
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
