export enum SortDirection {
    Ascending,
    Descending
}

export class User {
    constructor(
        public firstName = '',
        public lastName = '',
        public email = '',
        public dateOfBirth: Date = new Date(),
        public id?: number
    ) { }
}

export class UsersInfo {
    constructor(
        public collection: Array<User>,
        public totalUsers: number,
        public usersPerPage: number,
        public currentPage: number
    ) { }
}

export interface SortDescriptor {
    property: string;
    direction?: SortDirection;
}

export interface PageInfo {
    page?: number;
    size?: number;
    sort?: SortDescriptor;
}
