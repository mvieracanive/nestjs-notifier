import { Injectable } from "@nestjs/common";

@Injectable()
export class OptionsNoticeModule {
  listsImports: any[];
  listsProvider: any;
  envTransport: string;
  envAppPort?: string;
  envAppName?: string;
  userContactField?: string;
  userCompanyField?: string;
  from?: string;
}

export class NotifyDecOptions {
  msg: string;
  emailListID: string;
  absoluteRefResource?: string;
  relativeRefResoruce?: string;
}

export class InternalOptions {
  envAppPort?: string;
  envAppName?: string;
  userContactField?: string;
  userCompanyField?: string;
  from?: string;

  constructor(moduleOptions: OptionsNoticeModule) {
    this.envAppName = moduleOptions.envAppName
      ? moduleOptions.envAppName
      : "APP_NAME";
    this.envAppPort = moduleOptions.envAppPort
      ? moduleOptions.envAppPort
      : "PORT";
    this.userContactField = moduleOptions.userContactField
      ? moduleOptions.userContactField
      : "email";
    this.userCompanyField = moduleOptions.userCompanyField
      ? moduleOptions.userCompanyField
      : "office";
    this.from = moduleOptions.from
      ? moduleOptions.from
      : '"System Notification" <noreplay@system.dom>';
  }
}


