interface TableauServeurProps {
    page: number;
    setPage: (page: number) => void;
  }
  
  export const TableauServeur = ({page, setPage}: TableauServeurProps) => {
  
    const changePage = (page: number) => {
        setPage(page);
    }
  
    return (    
        <>
            <div className="titre">Bienvenue Serveur</div>
            <div className="nav_receptionniste">
                <div onClick={() => changePage(1)}>Tables</div>
                <div onClick={() => changePage(2)}>Réservations</div>
            </div>
        </> 
    )
  }