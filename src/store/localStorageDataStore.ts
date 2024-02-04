import {create} from 'zustand'
import {ArmyRef, PlayerArmy} from "@/army";

type DataStoreType = {
    playerArmies: PlayerArmy[];
    setPlayerArmies: (data: PlayerArmy[]) => void;
}

const initStore = () => {
    let data = localStorage.getItem('playerArmies');
    if (!data || data.length == 0) {
        localStorage.setItem('playerArmies', JSON.stringify([{
            id: 2,
            race: 1,
            name: 'Knight of Azueri',
            cost: 750,
            units: [{
                heroes: [{
                    id: 1,
                    weapon: [],
                    armor: [],
                }],
                henchmen: [{
                    id: 1,
                    weapon: [],
                    armor: [],
                }]}
            ]
        }]));
        data = localStorage.getItem('playerArmies');
    }
    return (data ? JSON.parse(data) : null);
}

export const useLocalStorageDataStore = create<DataStoreType>((set) => ({
    playerArmies: initStore(),
    setPlayerArmies: (newData: PlayerArmy[]) => set({playerArmies: newData}),
}));