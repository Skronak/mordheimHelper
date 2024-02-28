//DATA as represented by the JSON file
export type ArmyData = {
    id: number,
    name: string,
    race: string,
    icon: string,
    background: string,
    units: UnitData[],
    skills: Rule[],
}

export type UnitData = {
    id: number,
    name: string,
    type: string
    icon: string,
    description: string,
    startingExp: number,
    cost: number,
    minLimit: number,
    maxLimit: number,
    profils: number[][],
    skills: number[],
    armourProficiency: number[],
    weaponHthProficiency: number[],
    weaponMissileProficiency: number[],
    miscellaneaousProficiency: number[],
    rules: Rule[]
}

export type EquipementData = {
    id: number,
    name: string,
    cost: number[], // match index with id army-1
    type: string,
    brace: boolean,
    hand: number,
    rule: string,
    specialRules: Rule[]
}

export type EquipementsData = {
    weapons: EquipementData[],
    armours: EquipementData[],
    miscellaneaous: EquipementData[]
}

export type ArmyRef = {
    id: number,
    name: string,
    race: string;
    icon: string,
    background: string;
    units: UnitRef[],
    skills: [],
    equipements: Equipement[]
}

export type UnitRef = {
    id: number,
    name: string,
    type: string,
    icon: string,
    description: string,
    startingExp: number,
    cost: number,
    minLimit: number,
    maxLimit: number,
    profils: number[][],
    weaponProfiency: Equipement[],
    armoursProficiency: Equipement[],
    miscellaneaousProficiency: Equipement[],
    rules: Rule[]
}

export type Rule = {
    name?: string,
    effect?: string
};


export type Equipement = {
    id: number,
    name: string,
    type: string,
    cost: number[],
    hand: number,
    brace: boolean,
    rule: string,
    specialRules: Rule[]
}

export type Equipements = {
    weapons: Equipement[],
    armours: Equipement[],
    miscellaneaous: Equipement[]
}

export type PlayerArmy = {
    id: number;
    race: string;
    raceId: number;
    name: string;
    cost: number;
    lastUpdate: string;
    units: PlayerUnit[];
}

export type PlayerUnit = {
    id: number;
    id_unit: number;
    type: string;
    weapon: number[];
    armor: number[];
    miscellaneaous: number[];
    //proficiency
}