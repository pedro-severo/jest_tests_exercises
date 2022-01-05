import { validateCharacter, Character, ValidateEmptyPropertiesOutput, performAttack } from './../src/streetFighter';

describe("Testing validateCharacter function", () => {
    test("It should return error by name not provided", () => {
        const character = new Character("", 100, 10, 10)
        const output = validateCharacter(character)
        expect(output.isValid).toBeFalsy()
        expect(output.errors).toHaveLength(1)
        expect(output.errors[0].key).toBe("name")
        expect(output.errors[0].value).toBe("")
    })
    test("It should return error by number zero in life, attack or defense", () => {
        const characterNoLife = new Character("Ken", 0, 0, 0)
        const noLifeOutput = validateCharacter(characterNoLife)
        expect(noLifeOutput.isValid).toBeFalsy()
        expect(noLifeOutput.errors).toHaveLength(3)
        expect(noLifeOutput.errors[0].key).toBe("life")
        expect(noLifeOutput.errors[1].key).toBe("attack")
        expect(noLifeOutput.errors[2].key).toBe("defense")
        expect(noLifeOutput.errors[0].value).toBe(0)
        expect(noLifeOutput.errors[1].value).toBe(0)
        expect(noLifeOutput.errors[2].value).toBe(0)
    })
    test("It should return error by negative number in life, attack or defense", () => {
        const characterNoLife = new Character("Ryu", -1, -1, -1)
        const noLifeOutput = validateCharacter(characterNoLife)
        expect(noLifeOutput.isValid).toBeFalsy()
        expect(noLifeOutput.errors).toHaveLength(3)
        expect(noLifeOutput.errors[0].key).toBe("life")
        expect(noLifeOutput.errors[1].key).toBe("attack")
        expect(noLifeOutput.errors[2].key).toBe("defense")
        expect(noLifeOutput.errors[0].value).toBe(-1)
        expect(noLifeOutput.errors[1].value).toBe(-1)
        expect(noLifeOutput.errors[2].value).toBe(-1)
    })
    test("It should not return error", () => {
        const character = new Character("Dhalsim", 100, 10, 10)
        const output = validateCharacter(character)
        expect(output.isValid).toBeTruthy()
        expect(output.errors).toHaveLength(0)
    })
})

describe.only("Testing performAttack function", () => {
    const invalidCharacter = new Character("", 0, 0, 0)
    const blanka = new Character("Blanka", 10, 10, 10)
    const guile = new Character("Guile", 10, 6, 7)
    const dhalsim = new Character("Dhalsim", 10, 7, 6)
    const sagat = new Character("Sagat", 10, 10, 9)
    describe("Testing invalid character error", () => {
        test("It should throw a error by a invalid attacker", () => {
            expect.assertions(1)
            try {
                performAttack(invalidCharacter, sagat)
            } catch (e) {
                expect(e.message).toBe("Invalid attacker or defender.")
            }
        })
        test("It should throw a error by a invalid defender", () => {
            expect.assertions(1)
            try {
                performAttack(blanka, invalidCharacter)
            } catch (e) {
                expect(e.message).toBe("Invalid attacker or defender.")
            }
        })
    })
    describe("Testing fight lógic.", () => {
        test("It should return an attack failure message by defense of defender bigger than attack of attacker", () => {
            const output = performAttack(guile, sagat)
            expect(output?.message).toBe("Attack failed. The attacker is too weak for this defender.")
        })
        test("It should return an attack failure message by defense of defender equal attack of attacker", () => {
            const output = performAttack(guile, dhalsim)
            expect(output?.message).toBe("Attack failed. The attacker is too weak for this defender.")
        })
        test("It should return a successful attack", () => {
            const takenPoints = blanka.attack - guile.defense
            const attackSnapshot = blanka.attack
            const defenseSnapshot = guile.defense
            const output = performAttack(blanka, guile)
            expect(output?.message).toBe(`Successful attack. ${blanka.name} took ${takenPoints} from ${guile.name}.`)
            expect(output?.attacker).toBeInstanceOf(Character)
            expect(output?.defender).toBeInstanceOf(Character)
            expect(output?.attacker?.attack).toBe(attackSnapshot - 2)
            expect(output?.defender?.defense).toBe(defenseSnapshot - takenPoints)
        })
    })

})