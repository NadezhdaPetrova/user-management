export enum SortDirection {
    Ascending,
    Descending
}

export class User {
    constructor(
        public firstName = '',
        public lastName = '',
        public email = '',
        public id?: number,
        public dateOfBirth?: Date
    ) {}
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
