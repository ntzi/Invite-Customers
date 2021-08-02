"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const Invites_1 = require("../services/classes/Invites");
class App {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const invites = new Invites_1.Invites();
            const list = invites.list();
            console.log('Customers to be invited:');
            list.forEach(customer => console.log(customer));
        });
    }
}
exports.App = App;
