import { NgModule } from '@angular/core';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: '', component: HomeComponent},
  { path: 'blog', component: BlogComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
