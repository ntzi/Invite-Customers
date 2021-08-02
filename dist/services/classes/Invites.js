"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invites = void 0;
const Config_1 = require("../../config/classes/Config");
const fs_1 = __importDefault(require("fs"));
class Invites {
    constructor() {
        this.config = new Config_1.Config();
    }
    list() {
        let allCustomers = this._readTextFile(this.config.customersFilePath);
        if (typeof allCustomers !== 'undefined') {
            let customersInRange = this._getCustomersInRange(allCustomers);
            customersInRange = this._sortAscending(customersInRange);
            return customersInRange;
        }
        return [];
    }
    _readTextFile(filePath) {
        let dataObj = [];
        let data = fs_1.default.readFileSync(filePath, 'utf8');
        let dataSplit = data.split('\n');
        dataSplit.splice(-1, 1);
        dataSplit.forEach(line => {
            try {
                let idSplit = line.split('id:')[1];
                let id = idSplit.split(',')[0].trim();
                let latSplit = line.split('lat:')[1];
                let lat = Number(latSplit.split(',')[0].trim());
                let longSplit = line.split('long:')[1];
                let long = Number(longSplit.split(',')[0].trim());
                dataObj.push({
                    "id": id,
                    "lat": lat,
                    "long": long
                });
            }
            catch (_a) {
                console.log(`Could not process input line: ${line}`);
            }
        });
        return dataObj;
    }
    _getCustomersInRange(allCustomers) {
        let customersToInvite = allCustomers
            .filter(customer => this._isCustomerInRange(customer.lat, customer.long))
            .map(customer => customer.id);
        return customersToInvite;
    }
    _isCustomerInRange(latCustomer, longCustomer) {
        const latCenter = this.config.coordinatesParloa.lat;
        const longCenter = this.config.coordinatesParloa.long;
        const maxDistanceAllowed = this.config.radius;
        const distance = this._greatCircleDistance(latCenter, longCenter, latCustomer, longCustomer);
        if (distance <= maxDistanceAllowed) {
            return true;
        }
        return false;
    }
    _greatCircleDistance(lat1, long1, lat2, long2) {
        // Calculate distance between 2 points on earth.
        // All input points should be in degrees.
        // Result is in kilometers.
        // Source: https://www.movable-type.co.uk/scripts/latlong.html
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (long2 - long1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c / 1000; // in kilometres
        return d;
    }
    _sortAscending(customers) {
        // Sort in ascending order
        customers.sort((a, b) => a.localeCompare(b));
        return customers;
    }
}
exports.Invites = Invites;
