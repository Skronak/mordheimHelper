import {ArmyRef} from "@/army";

export function getAssetUrl(name: string) {
    return `/assets/${name}`;
}

export function getPortraitAssetUrl(name: string) {
    return `/assets/portrait/${name}`;
}


export function getArmyIcon(data: ArmyRef[], id: number){
    let iconName = data.filter(item => item.id == id).map(item => item.icon)[0];
    return getAssetUrl(iconName);
}