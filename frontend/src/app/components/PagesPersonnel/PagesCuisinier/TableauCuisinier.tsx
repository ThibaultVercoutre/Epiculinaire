interface TableauCuisinierProps {
    page: number;
    setPage: (page: number) => void;
}

export const TableauCuisinier = ({page, setPage}: TableauCuisinierProps) => {

    const changePage = (page: number) => {
        setPage(page);
    }

    return (    
        <>
            <div className="titre">Bienvenue Gérant</div>
            <div className="nav_gerant">
                <div onClick={() => changePage(1)}>Commande par table</div>
                <div onClick={() => changePage(2)}>Stock</div>
                <div onClick={() => changePage(3)}>Plats/ingrédients</div>
                <div onClick={() => changePage(4)}>Ajout plat</div>
            </div>
        </> 
    )
}