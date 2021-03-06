import { IInvites } from '../interface/IInvites'
import { Config } from '../../config/classes/Config'
import fs from 'fs'


export class Invites implements IInvites {
    config: Config

    public constructor() {
        this.config = new Config()
    }

    public list() {
        let allCustomers = this._readTextFile(this.config.customersFilePath)
        if (typeof allCustomers !== 'undefined') {
            let customersInRange = this._getCustomersInRange(allCustomers)
            customersInRange = this._sortAscending(customersInRange)
            
            return customersInRange
        }

        return []
    }

    private _readTextFile(filePath: string) {
        let dataObj: { id: string, lat: number, long: number }[] = []

        let data = fs.readFileSync(filePath, 'utf8');
        let dataSplit = data.split('\n')
        dataSplit.splice(-1, 1)

        dataSplit.forEach(line => {
            try {

                let idSplit = line.split('id:')[1]
                let id = idSplit.split(',')[0].trim()
                
                let latSplit = line.split('lat:')[1]
                let lat = Number(latSplit.split(',')[0].trim())
                
                let longSplit = line.split('long:')[1]
                let long = Number(longSplit.split(',')[0].trim())
                
                dataObj.push({
                    "id": id,
                    "lat": lat,
                    "long": long
                })
            } catch {
                console.log(`Could not process input line: ${line}`)
            }
        })

        return dataObj
    }

    private _getCustomersInRange(allCustomers: { id: string, lat: number, long: number }[]): string[] {

        let customersToInvite = allCustomers
            .filter(customer => this._isCustomerInRange(customer.lat, customer.long))
            .map(customer => customer.id)
        
        return customersToInvite
    }

    private _isCustomerInRange(latCustomer: number, longCustomer: number): boolean {
        const latCenter = this.config.coordinatesParloa.lat
        const longCenter = this.config.coordinatesParloa.long
        const maxDistanceAllowed = this.config.radius

        const distance = this._greatCircleDistance(latCenter, longCenter, latCustomer, longCustomer)

        if (distance <= maxDistanceAllowed) {
            return true
        }

        return false
    }

    private _greatCircleDistance(lat1: number, long1: number, lat2: number, long2: number): number {
        // Calculate distance between 2 points on earth.
        // All input points should be in degrees.
        // Result is in kilometers.
        // Source: https://www.movable-type.co.uk/scripts/latlong.html

        const R = 6371e3; // metres
        const ??1 = lat1 * Math.PI / 180; // ??, ?? in radians
        const ??2 = lat2 * Math.PI / 180;
        const ???? = (lat2 - lat1) * Math.PI / 180;
        const ???? = (long2 - long1) * Math.PI / 180;

        const a = Math.sin(???? / 2) * Math.sin(???? / 2) +
            Math.cos(??1) * Math.cos(??2) *
            Math.sin(???? / 2) * Math.sin(???? / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c / 1000; // in kilometres

        return d
    }

    private _sortAscending(customers: string[]): string[] {
        // Sort in ascending order

        customers.sort((a, b) => a.localeCompare(b))
        
        return customers
    }
}