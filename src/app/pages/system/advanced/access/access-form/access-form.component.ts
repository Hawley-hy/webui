import {
  Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'app/enums/role.enum';
import { IxSlideInRef } from 'app/modules/ix-forms/components/ix-slide-in/ix-slide-in-ref';
import { SnackbarService } from 'app/modules/snackbar/services/snackbar.service';
import { DialogService } from 'app/services/dialog.service';
import { ErrorHandlerService } from 'app/services/error-handler.service';
import { SystemGeneralService } from 'app/services/system-general.service';
import { WebSocketService } from 'app/services/ws.service';
import { AppState } from 'app/store';
import { defaultPreferences } from 'app/store/preferences/default-preferences.constant';
import { lifetimeTokenUpdated } from 'app/store/preferences/preferences.actions';
import { selectPreferences } from 'app/store/preferences/preferences.selectors';
import { generalConfigUpdated } from 'app/store/system-config/system-config.actions';
import { selectGeneralConfig } from 'app/store/system-config/system-config.selectors';

@UntilDestroy()
@Component({
  templateUrl: 'access-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessFormComponent implements OnInit {
  isLoading = false;
  form = this.fb.group({
    token_lifetime: [defaultPreferences.lifetime, [
      Validators.required,
      Validators.min(30),
      Validators.max(Math.floor(2 ** 31 / 1000 - 1)), // Max value for setTimeout
    ]],
    ds_auth: [false],
  });

  get isEnterprise(): boolean {
    return this.systemGeneralService.isEnterprise;
  }
  protected readonly Role = Role;

  constructor(
    private fb: FormBuilder,
    private slideInRef: IxSlideInRef<AccessFormComponent>,
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private translate: TranslateService,
    private ws: WebSocketService,
    private errorHandler: ErrorHandlerService,
    private dialogService: DialogService,
    private systemGeneralService: SystemGeneralService,
  ) {}

  ngOnInit(): void {
    this.store$.select(selectPreferences).pipe(untilDestroyed(this)).subscribe((preferences) => {
      if (preferences.lifetime) {
        this.form.controls.token_lifetime.setValue(preferences.lifetime);
        this.cdr.markForCheck();
      }
    });

    this.store$.select(selectGeneralConfig).pipe(untilDestroyed(this)).subscribe((config) => {
      this.form.controls.ds_auth.setValue(config.ds_auth);
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    this.store$.dispatch(lifetimeTokenUpdated({ lifetime: this.form.value.token_lifetime }));

    if (this.isEnterprise) {
      this.isLoading = true;
      this.ws.call('system.general.update', [{ ds_auth: this.form.value.ds_auth }])
        .pipe(untilDestroyed(this)).subscribe({
          next: () => {
            this.isLoading = false;
            this.store$.dispatch(generalConfigUpdated());
            this.snackbar.success(this.translate.instant('Settings saved'));
            this.slideInRef.close(true);
            this.cdr.markForCheck();
          },
          error: (error) => {
            this.isLoading = false;
            this.dialogService.error(this.errorHandler.parseError(error));
            this.cdr.markForCheck();
          },
        });
    } else {
      this.snackbar.success(this.translate.instant('Settings saved'));
      this.slideInRef.close(true);
    }
  }
}
