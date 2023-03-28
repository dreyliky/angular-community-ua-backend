export interface ServiceUser {
    readonly tgId: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly photoUrl: string;
    readonly auth_date: number;
    readonly accessToken: string;
}
