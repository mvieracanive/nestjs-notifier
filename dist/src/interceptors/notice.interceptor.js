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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const operators_1 = require("rxjs/operators");
const notice_decorator_1 = require("../decorators/notice.decorator");
const notice_service_1 = require("../notice.service");
let NoticeInterceptor = class NoticeInterceptor {
    constructor(_noticeService, _reflector) {
        this._noticeService = _noticeService;
        this._reflector = _reflector;
    }
    intercept(context, next) {
        const notice = this.mergeNotice(this._reflector.get(notice_decorator_1.META_NOTICE, context.getClass()), this._reflector.get(notice_decorator_1.META_NOTICE, context.getHandler()));
        if (!notice) {
            return next.handle();
        }
        const req = context.switchToHttp().getRequest();
        return next.handle().pipe(operators_1.tap(() => this._noticeService.notifyByEmail(notice, req)), operators_1.tap(() => console.log("Notified by Notice Module")));
    }
    mergeNotice(obj1, obj2) {
        return Object.assign(Object.assign({}, obj1), obj2);
    }
};
NoticeInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [notice_service_1.NoticeService,
        core_1.Reflector])
], NoticeInterceptor);
exports.NoticeInterceptor = NoticeInterceptor;
//# sourceMappingURL=notice.interceptor.js.map