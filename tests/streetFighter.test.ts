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
    const attacker = new Character("Blanka", 10, 10, 9)
    const defender = new Character("Guile", 10, 6, 7)
    test("It should throw a error by a invalid attacker", () => {
        expect.assertions(1)
        try {
            performAttack(invalidCharacter, defender)
        } catch (e) {
            expect(e.message).toBe("Invalid attacker or defender.")
        }
    })
    test("It should throw a error by a invalid defender", () => {
        expect.assertions(1)
        try {
            performAttack(attacker, invalidCharacter)
        } catch (e) {
            expect(e.message).toBe("Invalid attacker or defender.")
        }
    })
})