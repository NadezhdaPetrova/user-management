import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { SortDirection, User, UsersInfo, PageInfo } from 'modules/users/models';

const sortDirectionValue = new Map()
    .set(SortDirection.Ascending, 'asc')
    .set(SortDirection.Descending, 'desc');

@Injectable()
export class UserService {
    private serverUrl: string = 'https://w-user-management.herokuapp.com/users';
    private datePipe: DatePipe = new DatePipe('en-US');
    private headers: Headers =  new Headers();

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    getUsers(pageInfo?: PageInfo): Observable<UsersInfo> {
        const url = this.getServiceUrl(pageInfo);

        return this.http.get(url)
                        .map((result: Response) => {
                            const body = result.json();
                            const usersInfo = this.generateUsersInfo(body);
                            return usersInfo;
                        })
                        .catch(result => this.handleError(result));
    }

    getUser(id: number): Observable<User> {
        const url = this.serverUrl + '/' + id;

        return this.http.get(url)
            .map((result: Response) => result.json())
            .catch(result => {
                return this.handleError(result);
            });
    }

    createUser(user: User): Observable<User> {
        const userToBeCreated = this.prepareUser(user);

        return this.http.post(this.serverUrl, JSON.stringify(userToBeCreated), { headers: this.headers })
            .map((result: Response) => result.json())
            .catch(result => this.handleError(result));
    }

    updateUser(user: User): Observable<User> {
        const userToBeUpdated = this.prepareUser(user);

        return this.http.put(this.serverUrl, JSON.stringify(userToBeUpdated), { headers: this.headers })
            .map((result: Response) => result.json())
            .catch(result => this.handleError(result));
    }

    deleteUser(id: number) {
        const url = this.serverUrl + '/' + id;

        return this.http.delete(url)
            .map((result: Response) => true)
            .catch(result => this.handleError(result));
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

    private handleError(result): Observable<string> {
        const body = result.json();
        return Observable.throw(body.message);
    }

    private prepareUser(user) {
        const formattedDateOfBirth = this.datePipe.transform(user.dateOfBirth, 'y-MM-dd');
        const userToBeCreated = Object.assign({}, user, { dateOfBirth: formattedDateOfBirth });
        return userToBeCreated;
    }
}
