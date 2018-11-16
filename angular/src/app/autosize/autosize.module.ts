import {NgModule, ModuleWithProviders} from '@angular/core';
import {AutosizeDirective} from './autosize.directive';
export * from './autosize.directive';

@NgModule({
  declarations: [
    AutosizeDirective
  ],
  exports: [
    AutosizeDirective
  ]
})
export class AutosizeModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: AutosizeModule, providers: []};
  }
}
