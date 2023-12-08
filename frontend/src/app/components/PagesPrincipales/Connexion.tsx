import axios from "axios";
import "../../style/connexion.css";

import { useState, useEffect } from "react";

import { User as UserType } from "../../types/User";

interface ConnexionProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const Connexion = ({user, setUser}: ConnexionProps) => {

    const [formData, setFormData] = useState({
        name: "",
        password: ""
    });

    const handleRegister = async () => {
        const fetchedUser = async () => {
            return (await axios.get(`http://localhost:5000/user/${formData.name}/${formData.password}`)).data;
        }
        
        const dataUser = await fetchedUser();
        if(dataUser.length != 0) {
            setUser(dataUser[0]);
        }
    }

    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
          handleRegister();
        }
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
          <div className="login-container">
            <div className="login-form">
                <div className="form-group">
                    <div className="role-field">
                        <label htmlFor="role">Role</label>
                        <input onKeyDown={handleKeyPress} onChange={handleInputChange} name="name" value={formData.name} type="text" id="id" placeholder="Entrez votre identifiant" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe </label>
                    <input onKeyDown={handleKeyPress} onChange={handleInputChange} name="password" value={formData.password} type="password" id="password" placeholder="Entrez votre mot de passe" />
                </div>
                <div>
                  <button onClick={handleRegister} className="connecter">Se connecter</button>
                </div>
            </div>
          </div>
      );
}