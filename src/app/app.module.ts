import { NgModule, ValueProvider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from 'modules/shared/shared.module';
import { UsersModule } from 'modules/users/users.module';

import { AppComponent } from 'app.component';
import { UsersEffects } from 'effects/users';
import { DialogEffects } from 'effects/dialog';
import { DeletionEffects } from 'effects/deletion';
import { ToastEffects } from 'effects/toast';

import { WindowRefService } from 'services/window-ref.service';

import { reducer } from 'reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    UsersModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(UsersEffects),
    EffectsModule.run(DialogEffects),
    EffectsModule.run(DeletionEffects),
    EffectsModule.run(ToastEffects)
  ],
  providers: [WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
