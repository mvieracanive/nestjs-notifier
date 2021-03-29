import { MailerService } from "@nestjs-modules/mailer";
import { NotifyDecOptions, InternalOptions } from "./types/options.class";
export declare class NoticeService {
    private _mailer;
    private _emailLists;
    _options: InternalOptions;
    constructor(_mailer: MailerService, _emailLists: any, _options: InternalOptions);
    getEmailList(listID: string, userEmail: string): Promise<any>;
    signature(userEmail: string, userData: string): string;
    notifyByEmail(notice: NotifyDecOptions, req: any): Promise<void>;
}
