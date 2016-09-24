export class Alert {
    constructor(
        public type: AlertType,
        public msg: string,
        public closable = true
    ) { }
}

export enum AlertType {
    success,
    info,
    warning,
    danger
}
