import {useState, useEffect} from 'react';
import "../../style/gerant.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

import { Tables } from "./PagesGerant/Tables";
import { TableauGerant } from "./PagesGerant/TableauGerant";
import { Stock } from "./PagesGerant/Stock";
import { Agenda } from "./PagesGerant/Agenda";
import { Finances } from "./PagesGerant/Finances";
import { SuiviPlats } from "./PagesGerant/SuiviPlats";
import { Historique } from "./PagesGerant/Historique";

interface GerantProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Gerant = ({user, setUser}: GerantProps) => {

    const [page, setPage] = useState(0);

    const components: {[key: number]: JSX.Element} = {
      0: <TableauGerant page={page} setPage={setPage}/>,
      1: <Finances page={page} setPage={setPage} />,
      2: <SuiviPlats page={page} setPage={setPage} />,
      3: <Stock page={page} setPage={setPage} />,
      4: <Agenda page={page} setPage={setPage} />,
      5: <Tables page={page} setPage={setPage} />,
      6: <Historique page={page} setPage={setPage} />
    };

    return (    
      <>
          <Header user={user} setUser={setUser} title = 'Gérant'/>

          {components[page]}
        
          {/* <Footer />      */}
      </> 
    )
}