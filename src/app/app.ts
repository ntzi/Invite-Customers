import { Invites } from '../services/classes/Invites'


export class App {
    public async start() {
        const invites = new Invites()
        const list = invites.list()
        
        console.log('Customers to be invited:')
        list.forEach(customer => console.log(customer))
    }
}