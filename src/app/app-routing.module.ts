import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./sign-in/sign-in.module`).then(m => m.SignInModule),
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import(`./layout/layout.module`).then(m => m.LayoutModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
