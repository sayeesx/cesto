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
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const uploads_service_1 = require("./uploads.service");
const cloudinary_service_1 = require("./cloudinary.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let UploadsController = class UploadsController {
    uploadsService;
    cloudinaryService;
    constructor(uploadsService, cloudinaryService) {
        this.uploadsService = uploadsService;
        this.cloudinaryService = cloudinaryService;
    }
    getCloudinarySignature(folder = 'cesto/products') {
        return this.cloudinaryService.generateSignedUploadParams(folder);
    }
    getPresignedUrl(req, folder = 'general', contentType = 'image/jpeg') {
        return this.uploadsService.getPresignedUploadUrl(folder, contentType, req.user.sub);
    }
    deleteFile(req, key) {
        return this.uploadsService.deleteFile(key, req.user.sub);
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)('cloudinary-sign'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __param(0, (0, common_1.Body)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "getCloudinarySignature", null);
__decorate([
    (0, common_1.Post)('presigned-url'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('folder')),
    __param(2, (0, common_1.Body)('contentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.Delete)(':key'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "deleteFile", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('v1/uploads'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService,
        cloudinary_service_1.CloudinaryService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map