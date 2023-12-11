import { useEffect, useState } from 'react';
import axios from 'axios';

import { Finance as FinanceType } from '../../../types/Finance';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import '../../../style/finances.css';

interface FinancesProps {
    page: number;
    setPage: (page: number) => void;
}

export const Finances = ({page, setPage}: FinancesProps) => {

    const [finances, setFinances] = useState<FinanceType[]>([]);

    const [tableau, setTableau] = useState<JSX.Element>(<></>);

    const [totalAnnee, setTotalAnnee] = useState(0);
    const [totalMois, setTotalMois] = useState(0);
    const [totalJour, setTotalJour] = useState(0);

    const fetchFinances = async () => {
        return (await axios.get(`http://localhost:5000/finances`)).data;
    };

    useEffect(() => {
        const getFinances = async () => {
            const financesFromServer = await fetchFinances();
            financesFromServer.forEach((element: any) => {
                element.date = new Date(element.date);
            });
            setFinances(financesFromServer);

        };
        getFinances();
        
    }, []);

    useEffect(() => {
        
        console.log(finances);
        const createTable = () => {
            const day = new Date();

            setTotalMois(0);

            let table = <></>;
            finances.forEach((element) => {
                var type = ""
                if(element.type === 1){
                    type = "Virement";
                }else{
                    type = "Liquide";
                }
                table = (
                    <>
                        {table}
                        <tr>
                            <td className='Date'>{element.date.toISOString().split('T')[0]}</td>
                            <td className='Numero Reservation'>{element.id_reservation}</td>
                            <td className='Montant'>{element.montant_virement}€</td>
                            <td className='Type'>{type}</td>
                        </tr>
                    </>
                );
            });
            setTableau(table);
        };

        createTable();

        const calculateTotals = () => {
            const today = new Date();
            const thisYear = today.getFullYear();
            const thisMonth = today.getMonth();
    
            let totalJour = 0;
            let totalMois = 0;
            let totalAnnee = 0;
    
            finances.forEach((element) => {
                const elementDate = element.date;
                const elementYear = elementDate.getFullYear();
                const elementMonth = elementDate.getMonth();
    
                if (elementDate.getDate() === today.getDate()) {
                    // Si la date correspond à aujourd'hui
                    totalJour += element.montant_virement;
                }
    
                if (elementYear === thisYear && elementMonth === thisMonth) {
                    // Si la date correspond à ce mois de cette année
                    totalMois += element.montant_virement;
                }
    
                if (elementYear === thisYear) {
                    // Si la date correspond à cette année
                    totalAnnee += element.montant_virement;
                }
            });
    
            setTotalJour(totalJour);
            setTotalMois(totalMois);
            setTotalAnnee(totalAnnee);
        };
    
        calculateTotals();

    }, [finances]);

    return (    
        <>  
            <HeaderPages page={page} setPage={setPage} title = "Finances" n_page={0}/>
            <div className='header_finances'>
                <div className='comptes'>
                    <div className='compte'>
                        <div className='titre'>Total Jour : {totalJour}€</div>
                    </div>
                    <div className='compte'>
                        <div className='titre'>Total Mois : {totalMois}€</div>
                    </div>   
                    <div className='compte'>
                        <div className='titre'>Total Année : {totalAnnee}€</div>
                    </div>    
                </div>
                <div className='tableau'><table className='list_finances'>
                        <thead>
                            <tr>
                                <td className='Date'>Date</td>
                                <td className='Numero Reservation'>Numéro Réservation</td>
                                <td className='Montant'>Montant</td>
                                <td className='Type'>Type</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableau}
                        </tbody>
                    </table></div>
            </div>
        </>
    )
}