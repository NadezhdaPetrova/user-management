import { NgModule, ValueProvider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';

import { AppComponent } from './app.component';
import { UserEffects } from './effects/user';

import { reducer } from './reducers';

const WINDOW_PROVIDER: ValueProvider = {
    provide: 'Window',
    useValue: window
};

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
    EffectsModule.run(UserEffects),
  ],
  providers: [WINDOW_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
