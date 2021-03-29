import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { NoticeService } from "../notice.service";
import { NotifyDecOptions } from "../types/options.class";
export declare class NoticeInterceptor implements NestInterceptor {
    private _noticeService;
    private _reflector;
    constructor(_noticeService: NoticeService, _reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    mergeNotice(obj1: NotifyDecOptions, obj2: NotifyDecOptions): NotifyDecOptions;
}
