export class Character {
    name: string
    life: number
    attack: number
    defense: number

    constructor(
        name: string,
        life: number,
        attack: number,
        defense: number
    ) {
        this.name = name,
        this.life = life,
        this.attack = attack,
        this.defense = defense
    }

    handleReceivedAttack(attack: number): void {
        const takenPoints = attack - this.defense
        this.defense -= takenPoints
    }

    handleAttackFatigue(): void{
        this.attack -= 2
    }
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

export interface PerformAttackResponse {
    message: string
    attacker?: Character
    defender?: Character
}

export const performAttack = (
    attacker: Character, 
    defender: Character, 
): PerformAttackResponse | undefined => {
    const validatedAttacker = validateCharacter(attacker)
    const validatedDefender = validateCharacter(defender)
    if (!validatedAttacker.isValid || !validatedDefender.isValid) throw new Error("Invalid attacker or defender.")
    if (attacker.attack <= defender.defense) {
        return {
            message: "Attack failed. The attacker is too weak for this defender."
        }
    }
    const takenPoints = attacker.attack - defender.defense
    defender.handleReceivedAttack(attacker.attack)
    attacker.handleAttackFatigue()
    return {
        message: `Successful attack. ${attacker.name} took ${takenPoints} from ${defender.name}.`,
        attacker,
        defender
    }
}

