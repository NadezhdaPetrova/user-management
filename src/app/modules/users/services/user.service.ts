import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { SortDirection, User, UsersInfo, PageInfo } from '../models';

const sortDirectionValue = new Map()
    .set(SortDirection.Ascending, 'asc')
    .set(SortDirection.Descending, 'desc');

@Injectable()
export class UserService {
    private serverUrl: string = 'https://w-user-management.herokuapp.com/users';

    constructor(private http: Http) { }

    getUsers(pageInfo?: PageInfo): Observable<UsersInfo> {
        // TODO: should I add a client validation???

        const url = this.getServiceUrl(pageInfo);

        return this.http.get(url)
                        .map((result: Response) => {
                            const body = result.json();
                            const usersInfo = this.generateUsersInfo(body);
                            return usersInfo;
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

    private getServiceUrl(pageInfo: PageInfo): string {
        let url = this.serverUrl;

        if (!this.isSet(pageInfo) ||
            !this.isSet(pageInfo.page) ||
            !this.isSet(pageInfo.size) ||
            !this.isSet(pageInfo.sort)) {
            return url;
        }

        url = url + '?';

        if (this.isSet(pageInfo.page)) {
            url = `${url}page=${pageInfo.page - 1}&`;
        }
        if (this.isSet(pageInfo.size)) {
            url = `${url}size=${pageInfo.size}&`;
        }
        if (this.isSet(pageInfo.sort)) {
            url = `${url}sort=${pageInfo.sort.property}`;
            if (this.isSet(pageInfo.sort.direction)) {
                url = `${url},${sortDirectionValue.get(pageInfo.sort.direction)}`;
            }
        }

        if (url.endsWith('&')) {
            url = url.slice(0, -1);
        }

        return url;
    }

    private isSet(item): boolean {
        return item !== undefined && item !== null;
    }

    private generateUsersInfo(item): UsersInfo {
        const usersInfo = new UsersInfo(
            item.content,
            item.totalElements,
            item.size,
            item.number
        );

        return usersInfo;
    }
}
