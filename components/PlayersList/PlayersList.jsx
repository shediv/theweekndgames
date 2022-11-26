import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../services/firebase'
import ArticleDelete from './ArticleDelete';
import styles from "@/styles/PlayersList.module.css"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const PlayersList = ({ theme = 'dark' }) => {

    const [players, setPlayers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchNumberTxt, setSearchNumberTxt] = useState('');

    useEffect(() => {
        const articleRef = collection(db, "players");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc, index) => ({
                id: doc.id,
                index: index+1,
                ...doc.data(),
            }));
            setArticles(articles);
            setPlayers(articles);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('bugme');
        if(token && token === 'avengers') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSearch = (e) => {
        if(e.target.value && e.target.value !== '') {
            const playersData = articles;
            playersData = playersData.filter((player) => {
                const playerName = player.name.toLowerCase();
                const searchedText = e.target.value.toLowerCase();
                return playerName.includes(searchedText)
            })
            setSearchText(e.target.value);
            setArticles(playersData);
        } else {
            setSearchText(e.target.value);
            setArticles(players);
        }
    };

    const handleNumberSearch = (e) => {
        if(e.target.value && e.target.value !== '') {
            const playersData = articles;
            playersData = playersData.filter((player) => {                
                return parseInt(player.index) === parseInt(e.target.value)
            })
            setSearchNumberTxt(e.target.value);
            setArticles(playersData);
        } else {
            setSearchNumberTxt(e.target.value);
            setArticles(players);
        }
    };


    return (
        <>
            <Grid container className={styles.gridView} justifyContent="center">
                <div className={styles.searchBar}>
                    <label className={styles.paddingRight}>Search </label>
                    <TextField type="text" placeholder='Name of player' InputProps={{ inputProps: { style: { color: '#fff' }}}} value={searchText} id="searchText" name="searchText" onChange={(e) => handleSearch(e)} />
                </div>
                { isLoggedIn &&
                    <div className={styles.searchBar}>
                        <label className={styles.paddingRight}>Search By Number </label>
                        <TextField type="text" placeholder='Number' InputProps={{ inputProps: { style: { color: '#fff' }}}} value={searchNumberTxt} id="searchNumberTxt" name="searchNumberTxt" onChange={(e) => handleNumberSearch(e)} />
                    </div>
                }
                <label className={styles.totalCount}>Total ({players.length}) </label>
                {articles.map(({ index, id, profilePic, name, approved, age, playerRole, address, createdAt, imageUrl }) => {
                    return <Card className={styles.cardView} key={id}>
                        <CardActionArea>
                            <CardMedia
                                className={styles.picture}
                                image={profilePic ? profilePic : imageUrl}
                                title={name}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                #: {index}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                Name: {name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                Player Role: {playerRole}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Address : {address}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Age : {age}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            { approved ? 
                                    <Chip
                                        label="Approved"
                                        color="primary"
                                        variant="outlined"
                                    />
                                : 
                                    <Chip
                                        label="Not Approved"
                                        color="secondary"
                                        variant="outlined"
                                    />
                            }
                        </CardActions>
                        { isLoggedIn && 
                            <CardActions>
                                <ArticleDelete id={id} imageUrl={profilePic} />
                            </CardActions>
                        }
                    </Card>
                })}
            </Grid>
        </>       
    )
}

export default PlayersList