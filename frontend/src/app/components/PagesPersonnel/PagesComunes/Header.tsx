import "../../../style/nav.css";

import { useEffect, useState } from "react";

import { User as UserType } from "../../../types/User";

interface HeaderBarProps {
    title: string;
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Header = ({ title, user, setUser }: HeaderBarProps) => {

    const deconnexion = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
        setUser(null);
    }

    return (
        <div className="ribbon-container">
            <div className="logo"> </div>
            <div className="message"><div><span className={user?.name}/> Espace {title} <span className={user?.name}/></div></div>
            <div onClick={deconnexion} className="deconnexion">Deconnexion</div>
        </div>
    );
}
