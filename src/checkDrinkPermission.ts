export enum LOCATION {
    USA = "USA",
    BRAZIL = "BRAZIL",
}

export enum NACIONALITY {
    BRAZILIAN = "BRAZILIAN",
    USA_CITIZEN = "USA_CITIZEN",
}

export interface User {
    name: string;
    age: number;
    nacionality: NACIONALITY;
}

export interface Bar {
    name: string;
    location: LOCATION;
}

export interface Result {
    brazilians: ResultItem;
    usaCitizens: ResultItem;
}
  
export interface ResultItem {
    allowed: User[];
    unallowed: User[];
}

export const checkDrinkPermission = (bar: Bar, users: User[]): Result => {
    const brazilians: ResultItem = {
        allowed: [],
        unallowed: []    
    }
    const usaCitizens: ResultItem = {
        allowed: [],
        unallowed: []    
    }

    if (bar.location === LOCATION.BRAZIL) {
        users.forEach(user => {
            if (user.age >= 18) {
                if (user.nacionality === NACIONALITY.BRAZILIAN) brazilians.allowed.push(user)
                else usaCitizens.allowed.push(user)
            } else {
                if (user.nacionality === NACIONALITY.BRAZILIAN) brazilians.unallowed.push(user)
                else usaCitizens.unallowed.push(user)
            }
        })
    } else {
        users.forEach(user => {
            if(user.age >= 21) {
                if (user.nacionality === NACIONALITY.BRAZILIAN) brazilians.allowed.push(user)
                else usaCitizens.allowed.push(user)
            } else {
                if (user.nacionality === NACIONALITY.BRAZILIAN) brazilians.unallowed.push(user)
                else usaCitizens.unallowed.push(user)
            }
        })
    }
    return {
        brazilians,
        usaCitizens
    }
}