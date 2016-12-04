export enum SortDirection {
    Ascending,
    Descending
}

export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public dateOfBirth: Date
    ) {}
}
