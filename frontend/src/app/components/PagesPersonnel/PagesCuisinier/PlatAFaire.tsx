import React, { useEffect, useState } from 'react';

import { HeaderPages } from '../PagesComunes/HeaderPages';

interface PlatAFaireProps {
    page: number;
    setPage: (page: number) => void;
    returnPage: number;
}

export const PlatAFaire = ({page, setPage, returnPage}: PlatAFaireProps) => {

    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = "Détails" n_page={returnPage}/>
        </> 
    )
}