import { DynamicModule } from "@nestjs/common";
import { OptionsNoticeModule } from "./types/options.class";
export declare class NoticeModule {
    static forRoot(options: OptionsNoticeModule): DynamicModule;
}
