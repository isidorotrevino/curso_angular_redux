import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FotterComponent} from './fotter/fotter.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    FotterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FotterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule {
}
