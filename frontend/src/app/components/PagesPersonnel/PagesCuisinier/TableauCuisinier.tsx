import { Cuisinier as CuisinierType } from '../../../types/Cuisinier';

import { HeaderPages } from '../PagesComunes/HeaderPages';

interface TableauCuisinierProps {
    page: number;
    setPage: (page: number) => void;
    cuisinier: CuisinierType | null;
}

export const TableauCuisinier = ({page, cuisinier, setPage}: TableauCuisinierProps) => {

    const changePage = (page: number) => {
        setPage(page);
    }

    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = {cuisinier?.name} n_page={0}/>
            <div className="nav_gerant">
                {cuisinier?.id_personnel == 5 &&  <div onClick={() => changePage(2)}>Détails</div>}
                {cuisinier?.id_personnel != 5 && <div onClick={() => changePage(3)}>Plats à faire</div>}
                <div onClick={() => changePage(4)}>Stock</div>
                {cuisinier?.id_personnel == 5 &&  <div onClick={() => changePage(5)}>Proposer un plat</div>}
            </div>
        </> 
    )
}