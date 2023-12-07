import "../style/nav.css";

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
        <div className="ribbon">
          <div onClick={() => setVarPage(0)} className={`nav reservation-link ${isSelect[0]}`}>Accueil</div>
          <div onClick={() => setVarPage(1)} className={`nav reservation-link ${isSelect[1]}`}>Reservation</div>
          <div onClick={() => setVarPage(2)} className={`nav avis-link ${isSelect[2]}`}>Découvrez nous</div>
          <div onClick={() => setVarPage(3)} className={`nav gestion-link ${isSelect[3]}`}>Gestion</div>
        </div>
      </div>
  );
}
