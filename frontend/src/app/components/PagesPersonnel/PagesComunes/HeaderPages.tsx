interface HeaderPagesProps {
    title: string | undefined;
    page: number;
    n_page: number;
    setPage: (page: number) => void;
}

export const HeaderPages = ({n_page, title, page, setPage}: HeaderPagesProps) => {

    const returnPreviousPage = () => {
        setPage(n_page);
    }

    return (    
        <>
            <div className='header_pages_gerant'>
                <div onClick={returnPreviousPage} className="return true">Retour</div>
                <div className='titre'>{title}</div>
            </div>
        </> 
    )
}