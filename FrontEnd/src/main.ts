import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AbstractControl, ValidatorFn } from '@angular/forms';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export function noAdminValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        return control.value === 'ADMIN' ? { forbiddenRole: true } : null;
    };
}
