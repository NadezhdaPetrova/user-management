import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';

import { UserService } from './user.service';
import { PageInfo, SortDescriptor, SortDirection, UsersInfo, User } from 'modules/users/models';

describe('UserService tests', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                UserService,
                {
                    provide: Http,
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions
            ]
        });
    });

    describe('getUsers()', () => {
        const sortMock: SortDescriptor = Object.freeze({
            property: 'lastName',
            direction: SortDirection.Descending
        });

        const pageInfoMock: PageInfo = Object.freeze({
            page: 5,
            size: 3,
            sort: sortMock
        });

        const usersResponseMock = Object.freeze({
            'content': [
                {
                    'id': 1,
                    'firstName': 'Birgit',
                    'lastName': 'Prete',
                    'email': 'birgit.prete@mail.com',
                    'dateOfBirth': null
                },
                {
                    'id': 2,
                    'firstName': 'Valorie',
                    'lastName': 'Griffie',
                    'email': 'valorie.griffie@gmail.com',
                    'dateOfBirth': '2016-11-28'
                }
            ],
            'last': true,
            'totalElements': 17,
            'totalPages': 6,
            'first': false,
            'numberOfElements': 2,
            'sort': [
                {
                    'direction': 'DESC',
                    'property': 'lastName',
                    'ignoreCase': false,
                    'nullHandling': 'NATIVE',
                    'ascending': false
                }
            ],
            'size': 3,
            'number': 5
        });

        const errorResponseMock = Object.freeze({
            'timestamp': 1481442229883,
            'status': 404,
            'error': 'Not Found',
            'message': 'Something went wrong',
            'path': '/users123'
        });

        it('should return users', async(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                const request = connection.request;
                expect(request.url.endsWith('/users?page=4&size=3&sort=lastName,desc')).toBeTruthy();
                expect(request.method).toBe(RequestMethod.Get);
                expect(request.getBody()).toBeNull();

                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(usersResponseMock)
                })));
            });

            userService.getUsers(pageInfoMock).subscribe((usersInfo: UsersInfo) => {
                expect(usersInfo.collection).toEqual(usersResponseMock.content);
                expect(usersInfo.totalUsers).toBe(usersResponseMock.totalElements);
                expect(usersInfo.usersPerPage).toBe(usersResponseMock.size);
                expect(usersInfo.currentPage).toBe(usersResponseMock.number);
            });
        })));

        // How to mock failed request?
        xit('should return error', async(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                const request = connection.request;
                expect(request.url.endsWith('/users?page=4&size=3&sort=lastName,desc')).toBeTruthy();
                expect(request.method).toBe(RequestMethod.Get);
                expect(request.getBody()).toBeNull();

                connection.mockRespond(new Response(new ResponseOptions({
                    status: 400,
                    body: JSON.stringify(errorResponseMock)
                })));
                // connection.mockError(new Error(errorResponseMock.message));
            });

            userService.getUsers(pageInfoMock).subscribe(
                () => { throw new Error('The GET request was supposed to fail'); },
                (error: string) => {
                    expect(error).toBe(errorResponseMock.message);
                }
            );
        })));
    });

    describe('createUser()', () => {
        const userMock: User = Object.freeze(new User('firstName', 'lastName', 'email@test.com', '2016-12-11'));
        const responseMock = Object.freeze(Object.assign({}, userMock, { id: 3 }));

        it('should return the created user', async(inject([UserService, MockBackend],
        (userService: UserService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                const request = connection.request;
                expect(request.url.endsWith('/users')).toBeTruthy();
                expect(request.method).toBe(RequestMethod.Post);
                expect(request.getBody()).toEqual(JSON.stringify(userMock));
                expect(request.headers.get('content-type')).toBe('application/json');

                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(responseMock)
                })));
            });

            userService.createUser(userMock).subscribe((user: User) => {
                expect(user).toEqual(responseMock);
            });
        })));
    });

    describe('deleteUser()', () => {
        it('should return true if the user was deleted', async(inject([UserService, MockBackend],
        (userService: UserService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                const request = connection.request;
                expect(request.url.endsWith('/users/1')).toBeTruthy();
                expect(request.method).toBe(RequestMethod.Delete);

                connection.mockRespond(new Response(new ResponseOptions()));
            });

            userService.deleteUser(1).subscribe(res => {
                expect(res).toBeTruthy();
            });
        })));
    });
});
