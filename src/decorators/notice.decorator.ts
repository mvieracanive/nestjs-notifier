import { SetMetadata } from "@nestjs/common";
import { NotifyDecOptions } from "../types/options.class";

export const META_NOTICE = "notice_metadata";
export const Notify = (options: NotifyDecOptions) =>
  SetMetadata(META_NOTICE, options);
