import { bootstrapModule } from '@onecx/angular-webcomponents';
import { environment } from 'src/environments/environment';
import { OnecxRemoteComponentExampleUiModule } from './app/onecx-remote-component-example-ui-app.remote.module';

bootstrapModule(
  OnecxRemoteComponentExampleUiModule,
  'microfrontend',
  environment.production
);
