"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NoticeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const notice_service_1 = require("./notice.service");
const options_class_1 = require("./types/options.class");
let NoticeModule = NoticeModule_1 = class NoticeModule {
    static forRoot(options) {
        return {
            module: NoticeModule_1,
            imports: [
                mailer_1.MailerModule.forRootAsync({
                    useFactory: () => ({
                        transport: process.env[options.envTransport],
                        defaults: {
                            from: options.from,
                        },
                    }),
                }),
                ...options.listsImports,
            ],
            providers: [
                {
                    provide: "EMAIL_LISTS_PROVIDER",
                    useExisting: options.listsProvider,
                },
                {
                    provide: "OPTIONS",
                    useValue: new options_class_1.InternalOptions(options),
                },
                notice_service_1.NoticeService,
            ],
            exports: [notice_service_1.NoticeService],
        };
    }
};
NoticeModule = NoticeModule_1 = __decorate([
    common_1.Module({})
], NoticeModule);
exports.NoticeModule = NoticeModule;
//# sourceMappingURL=notice.module.js.map