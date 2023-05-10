"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var supertest_1 = __importDefault(require("supertest"));
describe('/skills', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app).delete('/__TEST__/data')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 200 and empty array', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .get('/skills')
                        .expect(src_1.HTTP_STATUSES.OK_200, [])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create new skill with incorrect input data', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .post('/skills')
                        .send({ title: '' })
                        .expect(src_1.HTTP_STATUSES.BAD_REQUEST)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .get('/skills')
                            .expect(src_1.HTTP_STATUSES.OK_200, [])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var createdSkill = null;
    var createdSkill2 = null;
    it('should create new skill with correct input data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .post('/skills')
                        .send({ title: 'new skill' })
                        .expect(src_1.HTTP_STATUSES.CREATED_201)];
                case 1:
                    createdResponse = _a.sent();
                    createdSkill = createdResponse.body;
                    expect(createdSkill).toEqual({
                        id: expect.any(Number),
                        title: "new skill"
                    });
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .get('/skills')
                            .expect(src_1.HTTP_STATUSES.OK_200, [createdSkill])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create none more skill', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .post("/skills")
                        .send({ title: 'skill 2 title' })
                        .expect(src_1.HTTP_STATUSES.CREATED_201)];
                case 1:
                    createdResponse = _a.sent();
                    createdSkill2 = createdResponse.body;
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .get('/skills')
                            .expect(src_1.HTTP_STATUSES.OK_200, [createdSkill, createdSkill2])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update skill with incorrect data', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .put('/skills/' + createdSkill.id)
                        .send({ title: '' })
                        .expect(src_1.HTTP_STATUSES.BAD_REQUEST)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .get('/skills/' + createdSkill.id)
                            .expect(src_1.HTTP_STATUSES.OK_200, __assign(__assign({}, createdSkill), { title: 'new skill' }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update skill which does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .put("/skills/" + 10)
                        .send({ title: 'normal title' })
                        .expect(src_1.HTTP_STATUSES.NOT_FOUND_404)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update skill with correct input data', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .put('/skills/' + createdSkill.id)
                        .send({ title: 'normal title' })
                        .expect(src_1.HTTP_STATUSES.CREATED_201)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .get('/skills/' + createdSkill.id)
                            .expect(src_1.HTTP_STATUSES.OK_200, __assign(__assign({}, createdSkill), { title: 'normal title' }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete all skills', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                        .delete('/skills/' + createdSkill.id)
                        .expect(src_1.HTTP_STATUSES.NO_CONTENT_204)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .get('/skills')
                            .expect(src_1.HTTP_STATUSES.OK_200, [createdSkill2])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .delete('/skills/' + createdSkill2.id)
                            .expect(src_1.HTTP_STATUSES.NO_CONTENT_204)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(src_1.app)
                            .get('/skills')
                            .expect(src_1.HTTP_STATUSES.OK_200, [])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
