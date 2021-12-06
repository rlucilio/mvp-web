import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { LayoutLoginComponent } from './components/layout-login/layout-login.component';

@NgModule({
  declarations: [LayoutComponent, LayoutLoginComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutComponent, LayoutLoginComponent],
})
export class LayoutModule {}
