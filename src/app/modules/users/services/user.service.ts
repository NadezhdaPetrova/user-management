import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';
import 'rxjs/Rx';

import { SortDirection, User } from '../models';

// const sortDirectionValue = new Map()
//     .set(SortDirection.Ascending, 'asc')
//     .set(SortDirection.Descending, 'desc');

const usersMock = [
    {'id': 1, 'firstName': 'Birgit', 'lastName': 'Prete', 'email': 'birgit.prete@mail.com', 'dateOfBirth': null},
    {'id': 2, 'firstName': 'Valorie', 'lastName': 'Griffie', 'email': 'valorie.griffie@gmail.com', 'dateOfBirth': null},
    {'id': 3, 'firstName': 'Devona', 'lastName': 'Kelch', 'email': 'devona.kelch@mail.com', 'dateOfBirth': null},
    {'id': 4, 'firstName': 'Denice', 'lastName': 'Osornio', 'email': 'denice.osornio@gmail.com', 'dateOfBirth': null},
    {'id': 5, 'firstName': 'Christia', 'lastName': 'Cambre', 'email': 'christia.cambre@mail.com', 'dateOfBirth': null},
    {'id': 6, 'firstName': 'Angel', 'lastName': 'Arora', 'email': 'angel.arora@gmail.com', 'dateOfBirth': null},
    {'id': 7, 'firstName': 'Shayla', 'lastName': 'Agrawal', 'email': 'shayla.agrawal@mail.com', 'dateOfBirth': null},
    {'id': 8, 'firstName': 'Sofia', 'lastName': 'Linwood', 'email': 'sofia.linwood@gmail.com', 'dateOfBirth': null},
    {'id': 9, 'firstName': 'Sharee', 'lastName': 'Jinks', 'email': 'sharee.jinks@mail.com', 'dateOfBirth': null},
    {'id': 10, 'firstName': 'Cherry', 'lastName': 'Hertz', 'email': 'cherry.hertz@gmail.com', 'dateOfBirth': null},
    {'id': 11, 'firstName': 'Judson', 'lastName': 'Hendrickson', 'email': 'judson.hendrickson@gmail.com', 'dateOfBirth': null},
    {'id': 12, 'firstName': 'Hsiu', 'lastName': 'Caldera', 'email': 'hsiu.caldera@mail.com', 'dateOfBirth': null},
    {'id': 13, 'firstName': 'Ardath', 'lastName': 'Jenkin', 'email': 'ardath.jenkin@gmail.com', 'dateOfBirth': null},
    {'id': 14, 'firstName': 'Addie', 'lastName': 'Roehrig', 'email': 'addie.roehrig@mail.com', 'dateOfBirth': null},
    {'id': 15, 'firstName': 'Stewart', 'lastName': 'Torian', 'email': 'stewart.torian@gmail.com', 'dateOfBirth': null}];

@Injectable()
export class UserService {
    // private serverUrl: string = 'https://w-user-management.herokuapp.com/users';
    // private serverUrl: string = 'http://localhost:4201/users';

    constructor(private http: Http) { }

    getUsers(page?: number, size?: number, sort?: string, sortDirection?: SortDirection): Observable<Array<User>> {
        // TODO: should I add a client validation???
        // TODO: improve the service to use the parameters

        // The server hasn't enabled CORS
        // return this.http.get(this.serverUrl)
        //                 .map((result: Response) => {
        //                     const body = result.json();
        //                     return body.content || [];
        //                 })
        //                 .catch(error => Observable.throw(error));

        let observer;
        const observable = Observable.create((subscriber: Subscriber<Array<User>>) => {
            observer = subscriber;
        });

        setTimeout(() => observer.next(usersMock), 2000);
        // setTimeout(() => observer.error("The actual error"), 2000);

        return observable;
    }

    createUser(user: User): Observable<User> {
        let observer;
        const observable = Observable.create((subscriber: Subscriber<Array<User>>) => {
            observer = subscriber;
        });

        const newUser = Object.assign({}, user, {id: 40});

        setTimeout(() => observer.next(newUser), 2000);
        // setTimeout(() => observer.error("The actual error. Very very long error that shows nothing but is long."), 2000);

        return observable;
    }
}
