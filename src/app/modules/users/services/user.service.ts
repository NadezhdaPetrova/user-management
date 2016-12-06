import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { SortDirection, User, PageInfo } from '../models';

const sortDirectionValue = new Map()
    .set(SortDirection.Ascending, 'asc')
    .set(SortDirection.Descending, 'desc');

@Injectable()
export class UserService {
    private serverUrl: string = 'https://w-user-management.herokuapp.com/users';

    constructor(private http: Http) { }

    getUsers(pageInfo?: PageInfo): Observable<Array<User>> {
        // TODO: should I add a client validation???

        const url = this.getServiceUrl(pageInfo);

        return this.http.get(url)
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

    getServiceUrl(pageInfo: PageInfo): string {
        let url = this.serverUrl;

        if (!pageInfo || !pageInfo.page || !pageInfo.size || !pageInfo.sort) {
            return url;
        }

        url = url + '?';

        if (pageInfo.page) {
            url = `${url}page=${pageInfo.page}&`;
        }
        if (pageInfo.size) {
            url = `${url}size=${pageInfo.size}&`;
        }
        if (pageInfo.sort) {
            url = `${url}sort=${pageInfo.sort.property}`;
            if (pageInfo.sort.direction) {
                url = `${url},${sortDirectionValue.get(pageInfo.sort.direction)}`;
            }
        }

        if (url.endsWith('&')) {
            url = url.slice(0, -1);
        }

        return url;
    }
}
