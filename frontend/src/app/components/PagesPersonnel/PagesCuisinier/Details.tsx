import React, { useEffect, useState } from 'react';

import { HeaderPages } from '../PagesComunes/HeaderPages';

interface DetailsProps {
    page: number;
    setPage: (page: number) => void;
    returnPage: number;
}

export const Details = ({page, setPage, returnPage}: DetailsProps) => {

    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = "Détails" n_page={returnPage}/>
        </> 
    )
}