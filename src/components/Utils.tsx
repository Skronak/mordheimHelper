import {WarbandRef} from "@/army";

// TODO : utilser new URL avec constant de tt les assets
export function getAssetUrl(name: string) {
    return `../assets/${name}`;
}

export function getAssetUrlRoot(name: string) {
    return `./assets/${name}`;
}

export function getPortraitAssetUrl(name: string) {
    return `../assets/portrait/${name}`;
}


export function getArmyIcon(data: WarbandRef[], id: number){
    let iconName = data.filter(item => item.id == id).map(item => item.icon)[0];
    return getAssetUrlRoot(iconName);
}
