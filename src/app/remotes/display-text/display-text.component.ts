import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AppConfigService,
  UserService,
} from '@onecx/angular-integration-interface';
import {
  AngularRemoteComponentsModule,
  BASE_URL,
  ocxRemoteComponent,
  ocxRemoteWebcomponent,
  RemoteComponentConfig,
} from '@onecx/angular-remote-components';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { TestAPI } from 'src/app/shared/generated';

@Component({
  standalone: true,
  imports: [
    AngularRemoteComponentsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  // TODO: Provide REMOTE_COMPONENT_CONFIG instead of BASE_URL
  providers: [
    {
      provide: BASE_URL,
      useValue: new ReplaySubject<string>(1),
    },
  ],
  selector: 'app-display-text',
  templateUrl: 'display-text.component.html',
})
export class OneCXDisplayTextComponent implements ocxRemoteComponent, ocxRemoteWebcomponent {
  permissions: string[] = [];
  text$: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  @Input() set ocxRemoteComponentConfig(config: RemoteComponentConfig) {
    this.ocxInitRemoteComponent(config);
  }

  constructor(
    @Inject(BASE_URL) private readonly baseUrl: ReplaySubject<string>,
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
    private readonly translateService: TranslateService,
    private readonly api: TestAPI
  ) {
    this.translateService.use(this.userService.lang$.getValue());
  }

  ocxInitRemoteComponent(config: RemoteComponentConfig): void {
    this.baseUrl.next(config.baseUrl);
    this.permissions = config.permissions;
    this.appConfigService.init(config.baseUrl);
    this.api.getText().subscribe((text) => {
      this.text$.next(text.text);
    });
  }
}
