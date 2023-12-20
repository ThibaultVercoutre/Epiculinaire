export type Plat = {
    platname: string;
    typename: string;
    date: string;
}

export type PlatMenu = {
    id: number;
    platname: string;
}

export type PlatDetails = {
    id: number;
    nom: string;
    ingredients: { nom: string; quantite: number }[];
}