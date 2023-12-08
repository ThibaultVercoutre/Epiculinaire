interface TableauReceptionnisteProps {
  page: number;
  setPage: (page: number) => void;
}

export const TableauReceptionniste = ({page, setPage}: TableauReceptionnisteProps) => {

  const changePage = (page: number) => {
      setPage(page);
  }

  return (    
      <>
          <div className="titre">Bienvenue Réceptionniste</div>
          <div className="nav_receptionniste">
              <div onClick={() => changePage(1)}>Tables</div>
              <div onClick={() => changePage(2)}>Réservations</div>
          </div>
      </> 
  )
}