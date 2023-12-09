interface ChoixServeurProps {
    page: number;
    setPage: (page: number) => void;
  }
  
  export const ChoixServeur = ({page, setPage}: ChoixServeurProps) => {
  
    const changePage = (page: number) => {
        setPage(page);
    }
  
    return (    
        <>
            <div className="titre">Bienvenue Serveur</div>
            <div className="nav_serveur">
                <div onClick={() => changePage(1)}>Tables</div>
                <div onClick={() => changePage(2)}>Réservations</div>
            </div>
        </> 
    )
  }