import { Bar, checkDrinkPermission, LOCATION, NACIONALITY } from './../src/checkDrinkPermission';

describe("Testing check drink permission", () => {
    const brazilian1 = {
        name: "Brazilian 1",
        age: 22,
        nacionality: NACIONALITY.BRAZILIAN
    }
    const brazilian2 = {
        name: "Brazilian 2",
        age: 19,
        nacionality: NACIONALITY.BRAZILIAN
    }
    const brazilian3 = {
        name: "Brazilian 3",
        age: 17,
        nacionality: NACIONALITY.BRAZILIAN
    }
    const usaCitizen1 = {
        name: "USA 1",
        age: 22,
        nacionality: NACIONALITY.USA_CITIZEN
    }
    const usaCitizen2 = {
        name: "USA 2",
        age: 19,
        nacionality: NACIONALITY.USA_CITIZEN
    }
    const usaCitizen3 = {
        name: "usaCitizen 3",
        age: 17,
        nacionality: NACIONALITY.USA_CITIZEN
    }
    const brazilianUsersMock = [brazilian1, brazilian2]
    const usaUsersMock = [usaCitizen1, usaCitizen2]

    describe("Testing permission check to a brazilian bar", () => {
        const barMock: Bar = {
            name: "Barkana",
            location: LOCATION.BRAZIL
        }

        describe("Testing without USA users", () => {
            test("It should return just allowed users", () => {
                const output = checkDrinkPermission(barMock, brazilianUsersMock)
                expect(output.brazilians.allowed[0]).toEqual(brazilian1)
                expect(output.brazilians.allowed[1]).toEqual(brazilian2)
                expect(output.brazilians.allowed[2]).toBeUndefined()
            })
            test("It should return allowed and unallowed users", () => {
                brazilianUsersMock.push(brazilian3)
                const output = checkDrinkPermission(barMock, brazilianUsersMock)
                expect(output.brazilians.unallowed[0]).toEqual(brazilian3)
                expect(output.brazilians.unallowed[1]).toBeUndefined()
            })
        })

        describe("Testing without brazilian users", () => {
            test("It should return just allowed users", () => {
                const output = checkDrinkPermission(barMock, usaUsersMock)
                expect(output.usaCitizens.allowed[0]).toEqual(usaCitizen1)
                expect(output.usaCitizens.allowed[1]).toEqual(usaCitizen2)
                expect(output.brazilians.allowed[2]).toBeUndefined()
            })
            test("It should return allowed and unallowed users", () => {
                usaUsersMock.push(usaCitizen3)
                const output = checkDrinkPermission(barMock, usaUsersMock)
                expect(output.usaCitizens.unallowed[0]).toEqual(usaCitizen3)
                expect(output.usaCitizens.unallowed[1]).toBeUndefined()
            })
        })

        describe("Testing with both nationalities user", () => {
            test("It should return allowed and unallowed users in both nationalities", () => {
                const output = checkDrinkPermission(barMock, brazilianUsersMock.concat(usaUsersMock))
                expect(output.brazilians.allowed[0]).toEqual(brazilian1)
                expect(output.usaCitizens.allowed[1]).toEqual(usaCitizen2)
                expect(output.usaCitizens.unallowed[0]).toEqual(usaCitizen3)
            })
        })
    })

    describe("Testing permission check to an usa bar", () => {
        const barMock: Bar = {
            name: "Outback",
            location: LOCATION.USA
        }
        test("It should return just allowed brazilian users", () => {
            const output = checkDrinkPermission(barMock, brazilianUsersMock)
            expect(output.brazilians.allowed[0]).toEqual(brazilian1)
            expect(output.brazilians.allowed[1]).toBeUndefined()

        })
        test("It should return allowed and unallowed brazilian users", () => {
            const output = checkDrinkPermission(barMock, brazilianUsersMock)
            expect(output.brazilians.unallowed[0]).toEqual(brazilian2)
            expect(output.brazilians.unallowed[1]).toEqual(brazilian3)
            expect(output.brazilians.unallowed[2]).toBeUndefined()
        })
        test("It should return just allowed usa users", () => {
            const output = checkDrinkPermission(barMock, usaUsersMock)
            expect(output.usaCitizens.allowed[0]).toEqual(usaCitizen1)
            expect(output.usaCitizens.allowed[1]).toBeUndefined()
        })
        test("It should return allowed and unallowed usa users", () => {
            const output = checkDrinkPermission(barMock, usaUsersMock)
            expect(output.usaCitizens.unallowed[0]).toEqual(usaCitizen2)
            expect(output.usaCitizens.unallowed[1]).toEqual(usaCitizen3)
            expect(output.usaCitizens.unallowed[2]).toBeUndefined()
        })    
        test("It should return allowed and unallowed users in both nationalities", () => {
            const output = checkDrinkPermission(barMock, brazilianUsersMock.concat(usaUsersMock))
            expect(output.brazilians.allowed[0]).toEqual(brazilian1)
            expect(output.usaCitizens.allowed[1]).toBeUndefined()
            expect(output.usaCitizens.unallowed[0]).toEqual(usaCitizen2)
        })
    })
})