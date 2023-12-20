import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { HeaderPages } from '../PagesComunes/HeaderPages';

import "../../../style/proposerplat.css";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

interface ProposerPlatProps {
    page: number;
    setPage: (page: number) => void;
    returnPage: number;
}

export const ProposerPlat = ({page, setPage, returnPage}: ProposerPlatProps) => {

    const [items, setItems] = useState(0);
    const [input, setInput] = useState<JSX.Element>(<></>);


    const handleConfirm = async () => {
        
        
        // const response = await axios.post(`http://localhost:5000/platadd/${formData.nom}/${formData.type}/${formData.prix}/${formData.specialisation}/${formData.ingredients}`, {}) ;
        // if(response.status == 200){
        //     alert("Votre proposition de plat a bien été prise en compte !");
        // }else{
        //     alert("Une erreur est survenue lors de la proposition de plat !");
        // }
    }

  



    useEffect(() => {
        console.log(items);

        const createInput = () => {
            let input = <></>;
            for(var j = 0; j < items; j++) {
                const element = items;
                const i = j + 1;
                input = (
                    <>
                        {input}
                        <input className='input'></input>
                    </>
                );
            };
            setInput(input);
        };
        createInput();
    }, [items]);


    return (    


        <>
            <HeaderPages page = {page} setPage = {setPage} title = "Proposer un Plat" n_page={returnPage}/>
            <table className='tableInput'>
                <tr>
                    <td><label htmlFor="nom">Nom du plat</label></td>
                    <td><input type="text" id="nom" name="nom" /></td>
                    <td><label htmlFor="type">Type de plat</label></td>
                    <td><input type="text" id="type" name="type" /></td>
                </tr>
                <tr>
                    <td><label htmlFor="prix">Prix</label></td>
                    <td><input type="text" id="prix" name="prix" /></td>
                    <td><label htmlFor="nom">Specialisation</label></td>
                    <td><input type="text" id="nom" name="nom" /></td>
                </tr>
            </table>

            <div className='ingredient'>
                <p>Ingredients</p>
                <table>  
                    <tr >    
                        <td className='plus_moins'>
                            <input className='input1' type="text"   />
                            <div  className="bouton" onClick={() => setItems(items + 1)}><PlusOutlined /></div>
                            <div  className="bouton" onClick={() => setItems(items - 1)}><MinusOutlined /></div>
                        </td>
                    </tr>   
                </table>
                <div className="nav_ingredients">{input}</div>
            </div>
            <div className="bouton confirm"><div onClick={handleConfirm}>Confirmer</div></div>

        </>

    )
}