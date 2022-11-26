import CircularProgress from '@material-ui/core/CircularProgress';
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Router from 'next/router';

function BaseLayout({children}) {
  const [showProgressLoader, setShowProgressLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tournamentSelected, setTournamentSelected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('bugme');
    const tournament = localStorage.getItem('tournament');
    if(token && token === 'avengers') {
      setIsLoggedIn(true);
    }
    
    if(!tournament || tournament !== 'vct2023') {
      Router.push('/');
    } else {
      setTournamentSelected(true);
    }
  }, []);

  const logoutUser = () => {
    setShowProgressLoader(true);
    localStorage.removeItem('bugme');
    Router.push('/login');
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser} tournamentSelected={tournamentSelected} />
      {showProgressLoader ? <CircularProgress disableShrink /> : children}
    </>
   );
}

export default BaseLayout;