import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { AngularAuthModule } from '@onecx/angular-auth'
import { bootstrapRemoteComponent } from '@onecx/angular-webcomponents'
import { environment } from 'src/environments/environment'
import { OneCXDisplayTextComponent } from './display-text.component'

bootstrapRemoteComponent(OneCXDisplayTextComponent, 'ocx-display-text-component', environment.production, [
  provideHttpClient(withInterceptorsFromDi()),
  importProvidersFrom(AngularAuthModule, BrowserModule, BrowserAnimationsModule),
  provideRouter([
    {
      path: '**',
      children: []
    }
  ]),
])