import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { SortDirection, User } from '../models';

// const sortDirectionValue = new Map()
//     .set(SortDirection.Ascending, 'asc')
//     .set(SortDirection.Descending, 'desc');

@Injectable()
export class UserService {
    private serverUrl: string = 'https://w-user-management.herokuapp.com/users';

    constructor(private http: Http) { }

    getUsers(page?: number, size?: number, sort?: string, sortDirection?: SortDirection): Observable<Array<User>> {
        // TODO: should I add a client validation???
        // TODO: improve the service to use the parameters

        return this.http.get(this.serverUrl)
                        .map((result: Response) => {
                            const body = result.json();
                            return body.content || [];
                        })
                        .catch(result => {
                            const body = result.json();
                            return Observable.throw(body.message);
                        });
    }

    createUser(user: User): Observable<User> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.serverUrl, JSON.stringify(user), { headers: headers })
                        .map((result: Response) => result.json())
                        .catch(result => {
                            const body = result.json();
                            return Observable.throw(body.message);
                        });
    }
}
