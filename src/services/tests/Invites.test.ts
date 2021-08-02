import { expect } from 'chai'
import { Invites } from '../classes/Invites'
import path from 'path'
// require('mocha-sinon');
// var sinon = require('sinon');

// import * as chai from 'chai';
// import sinonChai from 'sinon-chai';

// chai.use(sinonChai);

describe('Invites', async function () {
    const invites = new Invites()

    describe('_readTextFile', function () {
        it('should read data from txt file and reformat them', async function () {
            const expectedData = [
                {
                    id: '51730bbd-9bce-4d28-ae30-580e2ddd1be8',
                    lat: 50.43483821,
                    long: 11.96975958
                },
                {
                    id: '6890001c-57d4-4289-ab95-09a15a4cc775',
                    lat: 52.90932574,
                    long: 17.84508792
                },
                {
                    id: '25de3804-ca98-463b-88e0-17d3ae8418dc',
                    lat: 51.37904454,
                    long: 16.02052927
                },
                {
                    id: 'bbccc9e8-5cee-439a-a00c-0088b88bc327',
                    lat: 53.11368755,
                    long: 14.03961756
                },
                {
                    id: '546d899b-ca18-400a-b342-59b2426aad41',
                    lat: 50.4549391,
                    long: 10.12018809
                },
                {
                    id: 'bd6754a4-07b7-4de6-9471-5598bc24d5e2',
                    lat: 55.29794181,
                    long: 11.21015653
                }
            ]
            const filePath = path.join(__dirname, '../../../src/services/tests/data/', 'Customers_List.txt')

            const data = await (invites as any)._readTextFile(filePath)
            expect(data).to.eql(expectedData);
        });
    });

    describe('_getCustomersInRange', function () {
        it('should get the list of ids of customers located in range', async function () {
            const customers = [
                {
                    id: '25de3804-ca98-463b-88e0-17d3ae8418dc',
                    lat: 51.37904454,
                    long: 16.02052927
                },
                {
                    id: 'bbccc9e8-5cee-439a-a00c-0088b88bc327',
                    lat: 53.11368755,
                    long: 14.03961756
                },
                {
                    id: '546d899b-ca18-400a-b342-59b2426aad41',
                    lat: 50.4549391,
                    long: 10.12018809
                },
                {
                    id: '28353047-7789-4d0c-babb-adab12a4b082',
                    lat: 51.2151044,
                    long: 10.24302328
                },
                {
                    id: 'd5c05bd3-76d4-4c3c-9985-deb82751c611',
                    lat: 52.62407672,
                    long: 14.08227028
                },
                {
                    id: '87e7954e-2b6e-4572-acc7-81819e639ddd',
                    lat: 50.92810899,
                    long: 16.00613196
                },
            ]
            const expectedCustomersInRange = [
                'bbccc9e8-5cee-439a-a00c-0088b88bc327',
                'd5c05bd3-76d4-4c3c-9985-deb82751c611'
            ]

            const customersInRange = await (invites as any)._getCustomersInRange(customers)
            expect(customersInRange).to.eql(expectedCustomersInRange);
        });
    });

    describe('_isCustomerInRange', function () {
        it('should find if each customer is located in range or not', async function () {
            const customers = [
                {
                    isInRange: false,
                    lat: 51.37904454,
                    long: 16.02052927
                },
                {
                    isInRange: true,
                    lat: 53.11368755,
                    long: 14.03961756
                },
                {
                    isInRange: false,
                    lat: 50.4549391,
                    long: 10.12018809
                },
                {
                    isInRange: false,
                    lat: 51.2151044,
                    long: 10.24302328
                },
                {
                    isInRange: true,
                    lat: 52.62407672,
                    long: 14.08227028
                },
                {
                    isInRange: false,
                    lat: 50.92810899,
                    long: 16.00613196
                },
            ]

            customers.forEach(customer => {
                let isCustomerInRange = (invites as any)._isCustomerInRange(customer.lat, customer.long)
                expect(isCustomerInRange).to.eql(customer.isInRange);

            })
        });
    });

    describe('_greatCircleDistance', function () {
        it('should calculate the distance of each customer', async function () {
            const customers = [
                {
                    distance: 215.6176030214295,
                    lat: 51.37904454,
                    long: 16.02052927
                },
                {
                    distance: 79.69506482453377,
                    lat: 53.11368755,
                    long: 14.03961756
                },
                {
                    distance: 323.0955262130574,
                    lat: 50.4549391,
                    long: 10.12018809
                },
                {
                    distance: 261.8687519956844,
                    lat: 51.2151044,
                    long: 10.24302328
                },
                {
                    distance: 45.4001737387443,
                    lat: 52.62407672,
                    long: 14.08227028
                },
                {
                    distance: 247.7635480793169,
                    lat: 50.92810899,
                    long: 16.00613196
                },
            ]
            const latCenter = 52.493256
            const longCenter = 13.446082

            customers.forEach(customer => {
                let distance = (invites as any)._greatCircleDistance(customer.lat, customer.long, latCenter, longCenter)
                expect(distance).to.eql(customer.distance);

            })
        });
    });

    describe('_sortAscending', function () {
        it('should sort a list of strings', async function () {
            const customers = [
                '25de3804-ca98-463b-88e0-17d3ae8418dc',
                'bbccc9e8-5cee-439a-a00c-0088b88bc327',
                '546d899b-ca18-400a-b342-59b2426aad41',
                '28353047-7789-4d0c-babb-adab12a4b082',
                'd5c05bd3-76d4-4c3c-9985-deb82751c611',
                '87e7954e-2b6e-4572-acc7-81819e639ddd'
            ]
            const expectedCustomersSorted = [
                '25de3804-ca98-463b-88e0-17d3ae8418dc',
                '28353047-7789-4d0c-babb-adab12a4b082',
                '546d899b-ca18-400a-b342-59b2426aad41',
                '87e7954e-2b6e-4572-acc7-81819e639ddd',
                'bbccc9e8-5cee-439a-a00c-0088b88bc327',
                'd5c05bd3-76d4-4c3c-9985-deb82751c611'
            ]

            const customersSorted = (invites as any)._sortAscending(customers)
            expect(customersSorted).to.eql(expectedCustomersSorted);
        });
    });


});
