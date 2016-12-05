import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserComponent } from './components/user.component';
import { UserFormComponent } from './components/user-form.component';
import { UsersComponent } from './components/users.component';
import { UsersListComponent } from './components/users-list.component';
import { UserService } from './services/user.service';

@NgModule({
    declarations: [UserComponent, UserFormComponent, UsersComponent, UsersListComponent],
    exports: [UsersComponent],
    imports: [SharedModule],
    providers: [UserService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [UserComponent]
})
export class UsersModule { }
