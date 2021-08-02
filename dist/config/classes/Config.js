"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const path_1 = __importDefault(require("path"));
class Config {
    constructor() {
        this.customersFilePath = path_1.default.join(__dirname, '../../../static/data', 'Customers_List.txt');
        this.coordinatesParloa = {
            lat: 52.493256,
            long: 13.446082
        };
        this.radius = 100;
    }
}
exports.Config = Config;
