"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notify = exports.META_NOTICE = void 0;
const common_1 = require("@nestjs/common");
exports.META_NOTICE = "notice_metadata";
const Notify = (options) => common_1.SetMetadata(exports.META_NOTICE, options);
exports.Notify = Notify;
//# sourceMappingURL=notice.decorator.js.map