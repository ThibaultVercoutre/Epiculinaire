import { useEffect, useState } from 'react';

import { MapResto } from './MapResto';
import { HeaderPages } from '../PagesComunes/HeaderPages';

interface TablesProps {
    page: number;
    setPage: (page: number) => void;
}

export const Tables = ({page, setPage}: TablesProps) => {

    const [size, setSize] = useState({ width: 600, height: 600 });

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth/5, height: window.innerHeight/5 });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const returnPreviousPage = () => {
        setPage(0);
    }

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Tables" n_page={0}/>
            <div className='map'>
                <MapResto heightdiv={size.height} widthdiv={size.width} />
            </div>
        </>
    )
}