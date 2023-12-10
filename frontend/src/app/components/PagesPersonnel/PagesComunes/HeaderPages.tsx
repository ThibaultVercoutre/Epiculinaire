interface HeaderPagesProps {
    title: string | undefined;
    page: number;
    setPage: (page: number) => void;
}

export const HeaderPages = ({title, page, setPage}: HeaderPagesProps) => {

    const returnPreviousPage = () => {
        setPage(0);
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