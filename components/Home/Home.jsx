import React, { useEffect, useState } from 'react'
import styles from "@/styles/PlayersList.module.css"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

const Home = () => {

    const handleSelected = () => {
        localStorage.setItem('tournament', 'vct2023');
        Router.push('/register');
    };


    return (
        <>
            <div className={styles.background}>
                <div className={styles.homeMainSecView}>
                </div>
                <div className={styles.registerLayout}>
                    <div className={styles.mb2}>
                        <h4>Tournaments*</h4>
                        <Card className={styles.cardView}>
                            <CardActionArea>
                                <CardMedia
                                    className={styles.picture}
                                    image={"/assets/VCT_Logo_Png.png"}
                                    title={"Valpoi Champions Trophy"}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    <label className={styles.fontWeight}>Valpoi Champions Trophy 2023</label>
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button onClick={handleSelected} disabled size="medium" color="primary" variant="contained">
                                View
                            </Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </>      
    )
}

export default Home