import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { HelloAndMessageComponent } from './components/hello-and-message/hello-and-message.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { BtnComponent } from './components/btn/btn.component';
import { AskLinkComponent } from './components/ask-link/ask-link.component';

@NgModule({
  declarations: [
    LogoComponent,
    HelloAndMessageComponent,
    InputTextComponent,
    BtnComponent,
    AskLinkComponent,
  ],
  imports: [CommonModule],
  exports: [
    LogoComponent,
    HelloAndMessageComponent,
    InputTextComponent,
    BtnComponent,
    AskLinkComponent,
  ],
})
export class SharedComponentsModule {}
