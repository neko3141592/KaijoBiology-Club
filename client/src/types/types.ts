export type UserAuthType = {
    admin:boolean,
    edit:boolean,
    request:boolean,
}

export type UserDataType = {
    username:string,
    email:string,
    auth: UserAuthType,
    profile: string,
};

export type blogDataType = {
    id:string,
    title:string,
    tags:string[],
    text:string,
}