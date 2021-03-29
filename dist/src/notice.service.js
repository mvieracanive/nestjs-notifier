"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const options_class_1 = require("./types/options.class");
let NoticeService = class NoticeService {
    constructor(_mailer, _emailLists, _options) {
        this._mailer = _mailer;
        this._emailLists = _emailLists;
        this._options = _options;
    }
    async getEmailList(listID, userEmail) {
        const list = await this._emailLists.getList(listID);
        const i = list.indexOf(userEmail);
        if (i >= 0)
            list.copyWithin(i, list.length - 1).pop();
        return list.toString();
    }
    signature(userEmail, userData) {
        let signer = userEmail ? "Comunicarse con: " + userEmail : "";
        signer += userData ? ", Unidad Organizativa: " + userData : "";
        return signer;
    }
    async notifyByEmail(notice, req) {
        var _a, _b;
        const signer1field = this._options.userContactField;
        const signer2field = this._options.userCompanyField;
        let email;
        if (signer1field)
            email = (_a = req.user) === null || _a === void 0 ? void 0 : _a[signer1field];
        const list = await this.getEmailList(notice.emailListID, email);
        if (!list) {
            console.log("No existen usuarios a notificar");
            return;
        }
        let userData;
        if (signer2field)
            userData = (_b = req.user) === null || _b === void 0 ? void 0 : _b[signer2field];
        if (notice.relativeRefResoruce)
            notice.relativeRefResoruce += `${req.protocol}://${req.hostname}/
                ${this._options.envAppName
                ? process.env[this._options.envAppName]
                : ""}${notice.relativeRefResoruce}`;
        const signer = this.signature(email, userData);
        const link = notice.relativeRefResoruce
            ? notice.relativeRefResoruce
            : notice.absoluteRefResource;
        const htmlmsg = `<strong>${notice.msg}</strong><br>${link ? "Accesa al recurso en: " + link + "<br>" : ""}${signer}`;
        const msg = `${notice.msg}\n${link ? "Accesa al recurso en: " + link + "\n" : ""}${signer}`;
        console.log(list, msg);
        try {
            await this._mailer.sendMail({
                to: list,
                subject: "Notificación Automática del Sistema de Reciclaje",
                text: `${msg}`,
                html: `${htmlmsg}`,
            });
        }
        catch (exception) {
            console.log(exception);
        }
    }
};
NoticeService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject("EMAIL_LISTS_PROVIDER")),
    __param(2, common_1.Inject("OPTIONS")),
    __metadata("design:paramtypes", [mailer_1.MailerService, Object, options_class_1.InternalOptions])
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map