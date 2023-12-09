import { User as UserType } from "../types/User";

import { useEffect } from "react";

import { Cuisinier } from "./PagesPersonnel/Cuisinier";
import { Gerant } from "./PagesPersonnel/Gerant";
import { Receptionniste } from "./PagesPersonnel/Receptionniste";
import { Serveur } from "./PagesPersonnel/Serveur";

interface PersonnelProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Personnel = ({user, setUser}: PersonnelProps) => {

    const components: {[key: number]: JSX.Element} = {
        1: <Gerant user = {user} setUser={setUser}/>,
        2: <Serveur user = {user} setUser={setUser}/>,
        3: <Receptionniste user = {user} setUser={setUser}/>,
        4: <Cuisinier user = {user} setUser={setUser}/>,
    };

    return (
        <>
            {components[user?.id_user || 0]}
        </>
    );
}