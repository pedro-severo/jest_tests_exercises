import { User } from './../src/performPurchase';
import { performPurchase } from "../src/performPurchase"

describe("Testing perform purchase", () => {
    describe("Testing the return of performPurchase function with the user not having enough balance", () => {
        const user = new User("User name", 1000)
        const purchaseValue = 1200
        test("It should return undefined", () => {
            const output = performPurchase(user, purchaseValue)
            expect(output).toBeUndefined()
        })
    })

    describe("Testing the return of performPurchase function with the user not having enough balance", () => {
        const user = new User("User name", 1000)
        const purchaseValue = 200
        test("It should return a User interface", () => {
            const previousBalance = user.getBalance()
            const output = performPurchase(user, purchaseValue)
            expect(output?.getBalance()).toBeLessThan(previousBalance)

        })
    })

    describe("Testing purchase value and user balance value being equal", () => {
        const user = new User("User name", 1000)
        const purchaseValue = 1000
        test("It should return undefined", () => {
            const output = performPurchase(user, purchaseValue)
            expect(output).toBeUndefined()
        })
    })
})