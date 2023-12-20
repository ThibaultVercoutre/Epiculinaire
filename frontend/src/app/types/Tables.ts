export type Table = {
    id: number;
    taille: number;
    x: number;
    y: number;
    rotation: number;
    avancement: string;
    name: string;
    commandes: [
        {
            name: string;
            id: number;
            heure: string;
            etatString: string;
            _id: string;
        }
    ]
    _id: string;
}

export type SimpleTable = {
    id: number;
    name: string;
}