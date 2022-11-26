import styles from "./Navbar.module.css"
import Link from 'next/link'
import { IconButton } from "@mui/material";
import { useState } from "react";

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';


function Navbar({links, actions, showLanguageDropdown}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return ( 
    <div className={styles.navbar}>
        <nav className={styles.navcontent}>
            <Link href="/">
              <a style={{lineHeight: "0"}}><img className={styles.logo} src="/assets/logo.png" alt="VCT logo" /></a>
            </Link>

            <div className={mobileMenuOpen ? styles.menu + " " + styles.menuactive : styles.menu}>
              {links.map((link, index) => (
                  <Link href={link.path} key={index} data-testid={link.dataTestId}>
                    <a className={styles.menuItem}>{link.title}</a>
                  </Link>
                ))
                
              }
              {
                actions.map((action, index) => (
                  <span onClick={action.onClick} key={index} className={styles.menuItem} data-testid={action.dataTestId}>
                    {action.title}
                  </span>
                ))
              }
            </div>

            <IconButton 
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={styles.menuicon}
            >
              {mobileMenuOpen ? 
                <CloseIcon fontSize="large" sx={{color: "var(--palette-common-black)"}}/>
                :
                <MenuIcon fontSize="large" sx={{color: "var(--palette-common-black)"}}/>
              }
            </IconButton>
        </nav>
    </div>
   );
}

export default Navbar;