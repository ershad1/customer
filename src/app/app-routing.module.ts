import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {CustomerSaveComponent} from './customer/customer-save/customer-save.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {PostListComponent} from './posts/post-list/post-list.component';

const routes: Routes = [
  {path: '', component: CustomerListComponent},
  {path: 'createCustomer', component: CustomerSaveComponent},
  // {path: '', loadChildren: './customer/customer.module#CustomerModule'},
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
