import React, { useEffect, useState } from 'react';

import { PlatDetails as PlatType } from '../../../types/Plat';

import { HeaderPages } from '../PagesComunes/HeaderPages';

interface DetailsProps {
    page: number;
    setPage: (page: number) => void;
    returnPage: number;
}

interface DetailsProps {
    page: number;
    setPage: (page: number) => void;
    returnPage: number;
}

interface TableType {
    id: number;
    name: string;
}

export const Details = ({page, setPage, returnPage}: DetailsProps) => {

    const [tables, setTables] = useState<TableType[]>([]);
    const [selectedTable, setSelectedTable] = useState<TableType | null>(null);
    const [plats, setPlats] = useState<PlatType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                // Ajout de tables fictives pour tester l'affichage
                const fakeTables: TableType[] = [
                    { id: 1, name: 'Table 1' },
                    { id: 2, name: 'Table 2' },
                    { id: 3, name: 'Table 3' },
                ];

                setTables(fakeTables);
            } catch (error) {
                setError("Une erreur s'est produite lors de la récupération des tables.");
                console.error("Erreur Axios :", error);
            }
        };

        fetchTables();
    }, []);

    // Création de données fictives pour tester l'affichage
    const fakePlats1: PlatType[] = [
        {
            id: 1,
            nom: 'Plat 1',
            ingredients: [
                { nom: 'Tomate', quantite: 1 },
                { nom: 'Oignon', quantite: 1 },
                { nom: 'Nugget', quantite: 5 },
            ],
        },
    ];

    const fakePlats2: PlatType[] = [
        {
            id: 2,
            nom: 'Plat 2',
            ingredients: [
                { nom: 'Pomme de terre', quantite: 2 },
                { nom: 'Fromage', quantite: 3 },
                { nom: 'Bacon', quantite: 4 },
            ],
        },
    ];

    const fakePlats3: PlatType[] = [
        {
            id: 3,
            nom: 'Plat 3',
            ingredients: [
                { nom: 'Saumon', quantite: 1 },
                { nom: 'Asperge', quantite: 6 },
                { nom: 'Citron', quantite: 2 },
            ],
        },
    ];

    const handleTableClick = async (table: TableType) => {
        setSelectedTable(table);

        // Utilisez les données fictives en fonction de la table sélectionnée
        switch (table.id) {
            case 1:
                setPlats(fakePlats1);
                break;
            case 2:
                setPlats(fakePlats2);
                break;
            case 3:
                setPlats(fakePlats3);
                break;
            default:
                setPlats([]); // En cas de table inconnue
                break;
        }
    };

    return (
        <>
            <HeaderPages page={page} setPage={setPage} title="Détails" n_page={returnPage} />

            {error && <p>{error}</p>}

            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <h2>Liste des tables</h2>
                    <ul>
                        {tables.map((table) => (
                            <li key={table.id} onClick={() => handleTableClick(table)}>
                                {table.name} <p>1</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedTable && (
                    <div>
                        <h2>Plats pour la table: {selectedTable.id} {selectedTable.name}</h2>
                        <ul>
                            {plats.map((plat) => (
                                <li key={plat.id}>
                                    Nom du plat : {plat.nom} <br />
                                    Ingrédients :
                                    {plat.ingredients.map((ingredient, index) => (
                                        <span key={index}>
                                            {index > 0 && ', '}
                                            {ingredient.nom} ({ingredient.quantite})
                                        </span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}