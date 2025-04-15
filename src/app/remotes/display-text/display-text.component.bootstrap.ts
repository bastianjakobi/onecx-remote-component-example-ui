import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularAuthModule } from '@onecx/angular-auth'
import { bootstrapRemoteComponent } from '@onecx/angular-webcomponents'
import { environment } from 'src/environments/environment'
import { OneCXDisplayTextComponent } from './display-text.component'
import { BASE_URL, provideTranslateServiceForRoot } from '@onecx/angular-remote-components'
import { ReplaySubject } from 'rxjs'
import { TranslateLoader } from '@ngx-translate/core'
import { createRemoteComponentTranslateLoader } from '@onecx/angular-accelerator'

bootstrapRemoteComponent(OneCXDisplayTextComponent, 'ocx-display-text-component', environment.production, [
  {
    provide: BASE_URL,
    useValue: new ReplaySubject<string>(1),
  },
  provideHttpClient(withInterceptorsFromDi()),
  provideTranslateServiceForRoot({
    isolate: true,
    loader: {
      provide: TranslateLoader,
      useFactory: createRemoteComponentTranslateLoader,
      deps: [HttpClient, BASE_URL],
    }
  }),
  importProvidersFrom(AngularAuthModule, BrowserModule, BrowserAnimationsModule)
])