import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserComponent } from './components/form/user.component';
import { UserFormComponent } from './components/form/user-form.component';
import { UsersComponent } from './components/list/users.component';
import { UsersListComponent } from './components/list/users-list.component';
import { UsersPaginationComponent} from './components/list/users-pagination.component';
import { UsersToastComponent } from './components/list/users-toast.component';
import { UserService } from './services/user.service';

@NgModule({
    declarations: [
        UserComponent,
        UserFormComponent,
        UsersComponent,
        UsersListComponent,
        UsersPaginationComponent,
        UsersToastComponent
    ],
    exports: [UsersComponent],
    imports: [SharedModule],
    providers: [UserService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
