import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { HttpAdapterHost, Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { META_NOTICE } from "../decorators/notice.decorator";
import { NoticeService } from "../notice.service";
import { NotifyDecOptions } from "../types/options.class";

@Injectable()
export class NoticeInterceptor implements NestInterceptor {
  constructor(
    private _noticeService: NoticeService,
    private _reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const notice = this.mergeNotice(
      this._reflector.get<NotifyDecOptions>(META_NOTICE, context.getClass()),
      this._reflector.get<NotifyDecOptions>(META_NOTICE, context.getHandler())
    );

    if (!notice) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();
    //console.log("BASE URL", process.env, " ", req.protocol, " ", req.path, "", req.route);

    return next.handle().pipe(
      tap(() => this._noticeService.notifyByEmail(notice, req)),
      tap(() => console.log("Notified by Notice Module"))
    );
  }

  mergeNotice(obj1: NotifyDecOptions, obj2: NotifyDecOptions): NotifyDecOptions {
    return {
      ...obj1,
      ...obj2,
    };
  }
}
