export declare class OptionsNoticeModule {
    listsImports: any[];
    listsProvider: any;
    envTransport: string;
    envAppPort?: string;
    envAppName?: string;
    userContactField?: string;
    userCompanyField?: string;
    from?: string;
}
export declare class NotifyDecOptions {
    msg: string;
    emailListID: string;
    absoluteRefResource?: string;
    relativeRefResoruce?: string;
}
export declare class InternalOptions {
    envAppPort?: string;
    envAppName?: string;
    userContactField?: string;
    userCompanyField?: string;
    from?: string;
    constructor(moduleOptions: OptionsNoticeModule);
}
