import { CommonModule, Location } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserService } from '@onecx/angular-integration-interface';
import {
  AngularRemoteComponentsModule,
  BASE_URL,
  ocxRemoteComponent,
  ocxRemoteWebcomponent,
  RemoteComponentConfig,
} from '@onecx/angular-remote-components';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Configuration, TestAPI } from 'src/app/shared/generated';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [
    AngularRemoteComponentsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
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
    private readonly api: TestAPI,
    private readonly userService: UserService,
    private readonly translateService: TranslateService,
  ) {
    this.userService.lang$.subscribe((lang) => {
      this.translateService.use(lang);
    });
  }

  ocxInitRemoteComponent(config: RemoteComponentConfig): void {
    this.baseUrl.next(config.baseUrl);
    this.permissions = config.permissions;
    this.api.configuration = new Configuration({
      basePath: Location.joinWithSlash(config.baseUrl, environment.apiPrefix),
    })
    this.api.getText().subscribe((result) => {
      this.text$.next(result.text);
    });
  }
}
