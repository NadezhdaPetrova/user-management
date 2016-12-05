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
