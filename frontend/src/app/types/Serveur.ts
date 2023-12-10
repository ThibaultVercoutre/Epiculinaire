export type Serveur = {
    id: number;
    serveur_name: string;
    tables: [
        {
            id: {
                type: Number,
                required: true,
            },
            mission: {
            type: String,
            required: true,
            },
        }
    ]
    _id: string;
}
