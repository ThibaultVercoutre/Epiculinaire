import {useState, useEffect} from 'react';
import "../../style/receptionniste.css";

import { Header } from "./PagesComunes/Header";
import { Footer } from "../Footer";

import { User as UserType } from "../../types/User";

import { TableauReceptionniste } from "./PagesReceptionniste/TableauReceptionniste";
import { Tables } from "./PagesReceptionniste/Tables";
import { Agenda } from "./PagesReceptionniste/Agenda";

interface ReceptionnistProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Receptionniste = ({user, setUser}: ReceptionnistProps) => {
  
  const [page, setPage] = useState(0);

  const components: {[key: number]: JSX.Element} = {
    0: <TableauReceptionniste page={page} setPage={setPage}/>,
    1: <Tables page={page} setPage={setPage} />,
    2: <Agenda page={page} setPage={setPage} />
  };


  return (    
    <>
        <Header user={user} setUser={setUser} title = "Réceptionniste"/>

        {components[page]}
      
        {/* <Footer />      */}    
    </> 
  )
}