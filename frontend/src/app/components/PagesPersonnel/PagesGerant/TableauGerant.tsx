interface TableauGerantProps {
    page: number;
    setPage: (page: number) => void;
}

export const TableauGerant = ({page, setPage}: TableauGerantProps) => {

    const changePage = (page: number) => {
        setPage(page);
    }

    return (    
        <>
            <div className="titre">Bienvenu Gérant</div>
            <div className="nav_gerant">
                <div onClick={() => changePage(1)}>Finance</div>
                <div onClick={() => changePage(2)}>Suivi plats</div>
                <div onClick={() => changePage(3)}>Stock</div>
                <div onClick={() => changePage(4)}>Réservation</div>
                <div onClick={() => changePage(5)}>Tables</div>
                <div onClick={() => changePage(6)}>Historique</div>
            </div>
        </> 
    )
}