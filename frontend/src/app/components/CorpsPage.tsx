import {useEffect, useState} from 'react';

import { Accueil } from "./PagesPrincipales/Accueil";
import { Connexion } from "./PagesPrincipales/Connexion";
import { Reservation } from './PagesPrincipales/Reservation';
import { Decouverte } from "./PagesPrincipales/Decouverte";

import { User as UserType } from "../types/User";

interface CorpsPageProps {
    varPage: number;
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const CorpsPage = ({varPage, user, setUser}: CorpsPageProps) => {
    const components: {[key: number]: JSX.Element} = {
        0: <Accueil />,
        1: <Reservation />,
        2: <Decouverte />,
        3: <Connexion user = {user} setUser = {setUser}/>,
    };

    const [page, setPage] = useState(components[varPage]);

    useEffect(() => {
        setPage(components[varPage]);
    }, [varPage]);

    return (
        <div id='page'>
            {page}
        </div>
    );
}