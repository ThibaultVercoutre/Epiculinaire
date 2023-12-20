import "../style/nav.css";
import { HomeOutlined, UserOutlined, SolutionOutlined, EyeOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";

interface NavBarProps {
    varPage: number;
    setVarPage: (varPage: number) => void;
}

export const NavBar = ({ varPage, setVarPage}: NavBarProps) => {

  const [isSelect, setIsSelect] = useState(["", "", "", ""]);

  useEffect(() => {
    setIsSelect(["", "", "", ""]);
    setIsSelect((prev) => {
      prev[varPage] = "selected";
      return prev;
    });
  }, [varPage]);

  return (
    <div className="ribbon-container">
        <div className="logo"> </div>
        {/* Ruban avec les liens pour la réservation, la gestion du menu et les avis */}
        <div className="ribbon-content">
          <div className="ribbon">
            <div onClick={() => setVarPage(0)} className={`nav reservation-link ${isSelect[0]}`}>
              {typeof(window) && window.innerWidth > 600 ? 'Accueil' : <HomeOutlined />}
            </div>
            <div onClick={() => setVarPage(1)} className={`nav reservation-link ${isSelect[1]}`}>
              {typeof(window) && window.innerWidth > 600 ? 'Réservation' : <SolutionOutlined />}
            </div>
            <div onClick={() => setVarPage(2)} className={`nav avis-link ${isSelect[2]}`}>
              {typeof(window) && window.innerWidth > 600 ? 'Decouvrez-nous' : <EyeOutlined />}</div>
            <div onClick={() => setVarPage(3)} className={`nav gestion-link ${isSelect[3]}`}>
              {typeof(window) && window.innerWidth > 600 ? 'Gestion' : <UserOutlined />}
            </div>
          </div>
        </div>
      </div>
  );
}
