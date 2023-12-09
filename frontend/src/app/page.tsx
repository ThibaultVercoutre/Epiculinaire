"use client";

import "./style/accueil.css";

import { useRef, useEffect, useState, use } from 'react';

import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { CorpsPage } from "./components/CorpsPage";

import { Client } from "./Client";

import { Personnel } from "./components/Personnel";

import { User as UserType } from "./types/User";

export default function Home() {

  const [varPage, setVarPage] = useState(0);

  const [isConnected, setIsConnected] = useState(false);

  // const [user, setUser] = useState<UserType | null>(() => {
  //   if (window.localStorage) {
  //     const user = window.localStorage.getItem("user");
  //     setIsConnected(user ? true : false);
  //     return user ? JSON.parse(user) : null;
  //   }
  //   return null;
  // });

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [user]);

  return (
    <div className="home">
      {!isConnected && <Client user = {user} setUser = {setUser} varPage = {varPage} setVarPage = {setVarPage}/>}
      {isConnected && <Personnel user = {user} setUser={setUser}/>}
    </div>
  );
}
