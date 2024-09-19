import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    PageLoginComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
