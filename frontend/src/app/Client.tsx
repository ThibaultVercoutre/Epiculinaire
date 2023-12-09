"use client";

import "./style/accueil.css";

import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { CorpsPage } from "./components/CorpsPage";

import { User as UserType } from "./types/User";

interface ClientProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    varPage: number;
    setVarPage: (varPage: number) => void;
}

export const Client = ({user, setUser, varPage, setVarPage}: ClientProps) => {
  return (
    <>
      <NavBar varPage = {varPage} setVarPage = {setVarPage}/>
      <CorpsPage varPage = {varPage} user = {user} setUser = {setUser} />
      <Footer />
    </>
  );
}
