export class User {

    constructor(
        private name: string,
        private balance: number
    ) {}

    getBalance() {
        return this.balance
    }

    reduceBalance(value: number) {
        this.balance = this.balance - value
    }
}

export const performPurchase = (user: User, purchaseValue: number) => {
    const balance = user.getBalance()
    if (balance > purchaseValue) {
        user.reduceBalance(purchaseValue)
        return user
    }
}