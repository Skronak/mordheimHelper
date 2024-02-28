import {create} from 'zustand'
import armyData from "@/assets/armyData.json";
import equipData from "@/assets/equipmentData.json";
import {ArmyRef, ArmyData, Equipements, EquipementsData} from "@/army";

type DataStoreType = {
  appData: ArmyRef[];
  setAppData: (data: ArmyRef[]) => void;
  equipementData: EquipementsData;
  setEquipementData: (data: Equipements) => void;
}

const transformArmyDataToArmy = (armyData: ArmyData[]): ArmyRef[] => {

    return armyData.map(army => {
        return {
            ...army,
            units: army.units.map((unit) => {
                return {
                    id: unit.id,
                    name: unit.name,
                    type: unit.type,
                    icon: unit.icon,
                    description: unit.description,
                    startingExp: unit.startingExp,
                    cost: unit.cost,
                    minLimit: unit.minLimit,
                    maxLimit: unit.maxLimit,
                    profils: unit.profils,
                    skills: unit.skills,
                    rules: unit.rules,
                    weaponProfiency:unit.weaponHthProficiency.concat(unit.weaponMissileProficiency),
                    armoursProficiency: unit.armourProficiency,
                    miscellaneaousProficiency: [],
                }
            })
        }
    })
}

export const useDataStore = create<DataStoreType>((set) => ({
    appData: transformArmyDataToArmy(armyData),
    equipementData: equipData,
    setAppData: (newData: ArmyRef[]) => set({appData: newData}),
    setEquipementData: (newData: Equipements) => set({equipementData: newData}),
}));