import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Stock as StockType } from '../../../types/Stock';

import { HeaderPages } from '../PagesComunes/HeaderPages';

interface StockProps {
    page: number;
    setPage: (page: number) => void;
}

export const Stock = ({page, setPage}: StockProps) => {

    const [stock, setStock] = useState<StockType[]>([]);

    const [tableau, setTableau] = useState<JSX.Element>(<></>);

    const fetchStock = async () => {
        return (await axios.get(`http://localhost:5000/stock`)).data;
    };
    
    useEffect(() => {
        const getStock = async () => {
            const stockFromServer = await fetchStock();
            setStock(stockFromServer);
        };

        getStock();
    }, []);

    useEffect(() => {
        const createTable = () => {
            let table = <></>;
            stock.forEach((element) => {
                var unite = '';
                switch(element.type){
                    case 'volume(en L)': unite = 'Litre'; break;
                    case 'unite': unite = 'Pièce'; break;
                    case 'poids(en grammes)': unite = 'Gramme'; break;
                    default: unite = 'Erreur'; break;
                }
                if(element.quantity > 1){
                    unite += 's';
                }
                table = (
                    <>
                        {table}
                        <tr>
                            <td className='name'>{element.name}</td>
                            <td className='quantity'>{element.quantity} {unite}</td>
                        </tr>
                    </>
                );
            });
            setTableau(table);
        };
        createTable();
    }, [stock]);



    return (    
        <>
            <HeaderPages page = {page} setPage = {setPage} title = "Stock" />
            <div className='header_stock'>
                <table className='list_stock'>
                    {tableau}
                </table>
            </div>
        </> 
    )
}