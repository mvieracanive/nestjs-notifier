"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalOptions = exports.NotifyDecOptions = exports.OptionsNoticeModule = void 0;
const common_1 = require("@nestjs/common");
let OptionsNoticeModule = class OptionsNoticeModule {
};
OptionsNoticeModule = __decorate([
    common_1.Injectable()
], OptionsNoticeModule);
exports.OptionsNoticeModule = OptionsNoticeModule;
class NotifyDecOptions {
}
exports.NotifyDecOptions = NotifyDecOptions;
class InternalOptions {
    constructor(moduleOptions) {
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
exports.InternalOptions = InternalOptions;
//# sourceMappingURL=options.class.js.map