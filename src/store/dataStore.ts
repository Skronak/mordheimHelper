import {create} from 'zustand'
import data from "@/assets/armyData.json";
import items from "@/assets/equipmentData.json";
import {ArmyRef, ArmyData, EquipementsData, UnitData, Rule} from "@/army";

type DataStoreType = {
  appData: ArmyRef[];
  setAppData: (data: ArmyRef[]) => void;
}
const transformArmyDataToArmy = (data: ArmyData[], items: EquipementsData): ArmyRef[] => {

    return data.map(army => {
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
                    availableArmors: unit.armourProficiency.map(armourId => {
                        let item = items.armours.filter(item => item.id == armourId)[0];
                        return {
                            ...item,
                            cost: item.cost[army.id-1],
                        }
                    }),
                    availableHtHWeapons: unit.weaponHthProficiency.map(weaponId => {
                        let item = items.weapons.handToHand.filter(item => item.id == weaponId)[0];
                        return {
                            ...item,
                            cost: item.cost[army.id-1],
                        }
                    }),
                    availableMissileWeapons: unit.weaponMissileProficiency.map(weaponId => {
                        let item = items.weapons.missileWeapons.filter(item => item.id == weaponId)[0];
                        return {
                            ...item,
                            cost: item.cost[army.id-1],
                        }
                    }),
                }
            })
        }
    })
}

export const useDataStore = create<DataStoreType>((set) => ({
    appData: transformArmyDataToArmy(data, items),
    setAppData: (newData: ArmyRef[]) => set({appData: newData}),
}));