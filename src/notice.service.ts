import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable } from "@nestjs/common";

import {
  NotifyDecOptions,
  InternalOptions
} from "./types/options.class";

@Injectable()
export class NoticeService {
  constructor(
    private _mailer: MailerService,
    @Inject("EMAIL_LISTS_PROVIDER") private _emailLists: any,
    @Inject("OPTIONS") public _options: InternalOptions
  ) {}

  async getEmailList(listID: string, userEmail: string) {
    const list = await this._emailLists.getList(listID);
    const i = list.indexOf(userEmail);
    if (i >= 0) list.copyWithin(i, list.length - 1).pop();
    return list.toString();
  }

  signature(userEmail: string, userData: string) {
    let signer = userEmail ? "Comunicarse con: " + userEmail : "";
    signer += userData ? ", Unidad Organizativa: " + userData : "";
    return signer;
  }
  async notifyByEmail(notice: NotifyDecOptions, req: any) {
    const signer1field = this._options.userContactField;
    const signer2field = this._options.userCompanyField;
    let email;

    if (signer1field) email = req.user?.[signer1field];

    //Users list
    const list: string = await this.getEmailList(notice.emailListID, email);

    if (!list) {
      console.log("No existen usuarios a notificar");
      return;
    }

    //Firma del emisor
    let userData;
    if (signer2field) userData = req.user?.[signer2field];

    if (notice.relativeRefResoruce)
      notice.relativeRefResoruce = `${req.protocol}://${req.hostname}/
                ${
                  this._options.envAppName
                    ? process.env[this._options.envAppName]
                    : ""
                }${notice.relativeRefResoruce}`;

    const signer = this.signature(email, userData);
    const link = notice.relativeRefResoruce
      ? notice.relativeRefResoruce
      : notice.absoluteRefResource;

    const htmlmsg = `<strong>${notice.msg}</strong><br>${
      link ? "Accesa al recurso en: " + link + "<br>" : ""
    }${signer}`;
    const msg = `${notice.msg}\n${
      link ? "Accesa al recurso en: " + link + "\n" : ""
    }${signer}`;

    console.log(list, msg);
    try {
      await this._mailer.sendMail({
        to: list,
        subject: "Notificación Automática del Sistema de Reciclaje", // Subject line
        text: `${msg}`, // plaintext body
        html: `${htmlmsg}`, // HTML body content
      });
    } catch (exception) {
      console.log(exception);
    }
  }
}
