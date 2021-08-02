import path from 'path'

export class Config {
    customersFilePath: string
    coordinatesParloa: {
        lat: number, 
        long:number
    }
    radius: number

    public constructor() {
        this.customersFilePath =  path.join(__dirname, '../../../static/data', 'Customers_List.txt')
        this.coordinatesParloa = {
            lat: 52.493256,
            long: 13.446082
        }
        this.radius = 100
    }
}