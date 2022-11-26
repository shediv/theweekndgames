import { useState } from "react";
import Navbar from "../Navbar";

function Header( {isLoggedIn, logoutUser, tournamentSelected} ) {
  
  const navigationHome = {
    links: [],
    actions: [ ]
  }

  const navigationLoggedOut = {
    links: [      
      {
        title: "Players",
        path: "/players",
        dataTestId:"Players"
      },
      {
        title: "Register",
        path: "/register",
        dataTestId:"register"
      },
      {
        title: "Login",
        path: "/login",
        dataTestId:"Login"
      }
    ],
    actions: [ ]
  }

  const navigationLoggedIn = {
    links: [
      {
        title: "Register",
        path: "/register",
        dataTestId:"register"
      },
      {
        title: "Players",
        path: "/players",
        dataTestId:"Players"
      }
    ],
    actions: [
      {
        title: "Logout",
        showOnLoginIn: true,
        onClick: () => logoutUser(),
        dataTestId:"header-logout-button"
      }
    ]
  }

  return (
    <>
      { tournamentSelected ? 
        <Navbar 
          links={isLoggedIn ? navigationLoggedIn.links : navigationLoggedOut.links} 
          actions={isLoggedIn ? navigationLoggedIn.actions : navigationLoggedOut.actions} 
        />
        :
        <Navbar 
          links={navigationHome.links} 
          actions={navigationHome.actions}
        />  
      }
    </>
   );
}

export default Header;