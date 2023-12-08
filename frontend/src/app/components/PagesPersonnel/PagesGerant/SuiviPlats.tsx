import { useEffect, useState } from 'react';
import axios from 'axios';

import { HeaderPages } from '../PagesComunes/HeaderPages';

// import '../../../style/suiviplats.css';

interface SuiviPlatsProps {
    page: number;
    setPage: (page: number) => void;
}

export const SuiviPlats = ({page, setPage}: SuiviPlatsProps) => {

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Suivi Plats"/>
        </>
    )
}