import { MailerModule } from "@nestjs-modules/mailer";
import { DynamicModule, Inject, Module } from "@nestjs/common";
import { NoticeService } from "./notice.service";
import { InternalOptions, OptionsNoticeModule } from "./types/options.class";

@Module({})
export class NoticeModule {
  static forRoot(options: OptionsNoticeModule): DynamicModule {
    return {
      module: NoticeModule,
      imports: [
        MailerModule.forRootAsync({
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
          useValue: new InternalOptions(options),
        },
        NoticeService,
      ],
      exports: [NoticeService],
    };
  }
}
