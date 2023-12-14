import React, { useState, useEffect } from 'react';
import "../../style/cuisinier.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";
import { Cuisinier as CuisinierType } from '../../types/Cuisinier';

import { TableauCuisinier } from "./PagesCuisinier/TableauCuisinier";
import { ChoixCuisinier } from "./PagesCuisinier/ChoixCuisinier";
import { Stock } from './PagesCuisinier/StockCuisinier';
import { Details } from './PagesCuisinier/Details';
import { PlatAFaire } from './PagesCuisinier/PlatAFaire';
import { ProposerPlat } from './PagesCuisinier/ProposerPlat';

interface CuisinierProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Cuisinier = ({user, setUser}: CuisinierProps) => {
    
    const [cuisinier, setCuisinier] = useState<CuisinierType | null>(null);
    
    const [page, setPage] = useState(0);

    const components: {[key: number]: JSX.Element} = {
        0: <ChoixCuisinier page={page} setPage={setPage} setCuisinier={setCuisinier}/>,
        1: <TableauCuisinier page={page} setPage={setPage} cuisinier={cuisinier}/>,
        2: <Details page={page} setPage={setPage} returnPage={1}/>,
        3: <PlatAFaire page={page} setPage={setPage} returnPage={1}/>,
        4: <Stock page={page} setPage={setPage} returnPage={1}/>,
        5: <ProposerPlat page={page} setPage={setPage} returnPage={1}/>,
    };

    return (    
        <>
            <Header user = {user} setUser={setUser} title='Cuisinier'/>

            {components[page]}
          
            {/* <Footer /> */}
        </> 
  )
}