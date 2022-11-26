import styles from "@/styles/PlayersList.module.css"
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link';
import Router from 'next/router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login() {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  useEffect(() => {
    const token = localStorage.getItem('bugme');
    if(token && token === 'avengers') {
      Router.push('/')
    }
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = () => {
    console.log("username => ", formData)
    if (!formData.username || !formData.password) {
      alert("Please fill all the fields");
      return;
    }

    if (formData.username === "Localh0st" && formData.password === "#Sattar1-G0a-2023#") {
      localStorage.setItem('bugme', 'avengers');
      alert("Login Successful");
      Router.push('/')
    } else {
      alert("Wrong Credentials");
    }
  }

  return (
    <>
      <div className={styles.background}>
        <div className={styles.registerView}>
          <div className={styles.registerLayout}>

            <div className={styles.mb2}>
                <p>Name*</p>
                <TextField InputProps={{ inputProps: { style: { color: '#fff' }}}} value={formData.username} id="username" name="username" onChange={(e) => handleChange(e)} />
            </div>

            <div className={styles.mb2}>
                <p>Password*</p>
                <TextField type="password" InputProps={{ inputProps: { style: { color: '#fff' }}}} value={formData.password} id="password" name="password" onChange={(e) => handleChange(e)} />
            </div>

            <div className={styles.mb2}>
              <Button variant="contained" color="primary" component="span" onClick={handleLoginSubmit}>
                  Login
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
   );
}

export default Login;