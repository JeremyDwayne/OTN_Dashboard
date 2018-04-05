// From: http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications
export class Alert {
    type: AlertType;
    message: string;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
