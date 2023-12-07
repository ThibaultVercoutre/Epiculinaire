import {useState, useEffect} from 'react';
import "../../style/gerant.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

import { Tables } from "./PagesGerant/Tables";
import { TableauGerant } from "./PagesGerant/TableauGerant";
import { Stock } from "./PagesGerant/Stock";
import { Agenda } from "./PagesGerant/Agenda";

interface GerantProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Gerant = ({user, setUser}: GerantProps) => {

    const [page, setPage] = useState(0);

    const components: {[key: number]: JSX.Element} = {
      0: <TableauGerant page={page} setPage={setPage}/>,
      3: <Stock page={page} setPage={setPage} />,
      4: <Agenda page={page} setPage={setPage} />,
      5: <Tables page={page} setPage={setPage} />
    };

    return (    
      <>
          <Header user={user} setUser={setUser}/>

          {components[page]}
        
          {/* <Footer />      */}
      </> 
    )
}