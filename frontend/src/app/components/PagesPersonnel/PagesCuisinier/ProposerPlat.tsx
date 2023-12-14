import React, { useEffect, useState } from 'react';

import { HeaderPages } from '../PagesComunes/HeaderPages';

interface ProposerPlatProps {
    page: number;
    setPage: (page: number) => void;
    returnPage: number;
}

export const ProposerPlat = ({page, setPage, returnPage}: ProposerPlatProps) => {

    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = "Détails" n_page={returnPage}/>
        </> 
    )
}