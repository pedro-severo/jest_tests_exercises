export class Character {

    constructor(
        private name: string,
        private life: number,
        private attack: number,
        private defense: number
    ) {}
}

export interface ValidateEmptyPropertiesOutput {
    isValid: boolean,
    errors: PropertiesError[]
}

export interface PropertiesError {
    key: string,
    value: any
}

export const validateCharacter = (character: Character): ValidateEmptyPropertiesOutput => {
    const errors: PropertiesError[] = []
    const keys = Object.keys({...character})
    Object.values(character).forEach((value, index) => {
        if (!value || (value as Number && value < 0)) {
            errors.push({
                key: keys[index],
                value
            })
        }
    })
    return {
        isValid: !errors.length,
        errors
    }
}

export const performAttack = (
    attacker: Character, 
    defender: Character, 
) => {
    const validatedAttacker = validateCharacter(attacker)
    const validatedDefender = validateCharacter(defender)
    if (!validatedAttacker.isValid || !validatedDefender.isValid) throw new Error("Invalid attacker or defender.")
}

