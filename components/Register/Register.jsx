// import { Progress } from '@mantine/core'
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, storage } from '../../services/firebase';
import { REGISTERPAGE, PAYMENTPAGE, PAYMENTLINK, PAYMENTNUMBER } from '@/constants/appConstants'

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from "@/styles/PlayersList.module.css"


const Register = ({ theme = 'dark' }) => {

    const [playPosition, setPlayPosition] = React.useState('AR');

    const [articles, setArticles] = useState([])
    const [formData, setFormData] = useState({
        profilePic: "",
        name: "",
        mobileNumber: "",
        age: "",
        playerRole: 'All Rounder',
        address: "",
        approved: false,
        createdAt: Timestamp.now().toDate()
    })
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);


    useEffect(() => {
        const articleRef = collection(db, "players");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articles);
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, profilePic: e.target.files[0] });
        setImageSelected(true);
    };

    const handlePublish = () => {
        if (!formData.profilePic || !formData.name || !formData.mobileNumber || !formData.age || !formData.playerRole || !formData.address) {
            alert("Please fill all the fields");
            return;
        }

        setUploading(true);
        window.scrollTo(0, 0);
        const storageRef = ref(storage, `/images/${Date.now()}${formData.profilePic.name}`);

        const uploadImage = uploadBytesResumable(storageRef, formData.profilePic);
        uploadImage.on("state_changed", (snapshot) => {
            const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progressPercent);
        }, (err) => { console.log(err); },
            () => {
                setFormData({
                    profilePic: "",
                    name: "",
                    mobileNumber: "",
                    age: "",
                    playerRole: "",
                    address: "",
                });

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const articleRef = collection(db, "players");
                    addDoc(articleRef, {
                        profilePic: url,
                        name: formData.name,
                        mobileNumber: formData.mobileNumber,
                        age: formData.age,
                        playerRole: formData.playerRole,
                        address: formData.address,
                        createdAt: Timestamp.now().toDate(),
                        tournament: "vct2023"
                    }).then(() => {
                        toast("file added successfully", { type: "success" });
                        setProgress(0);
                        setCompleted(true);
                        setUploading(false);
                    })
                    .catch((err) => {
                        toast("Error in adding file", { type: "error" });
                        setCompleted(false);
                        setUploading(false);
                    });
                })
            });
    };

    const handleDesignationChange = (e) => {
        setPlayPosition(e.target.value);
        setFormData({ ...formData, playerRole: e.target.value });
    };

    return (
        <div className={styles.background}>
            <div className={styles.registerView}>
                <div className={styles.registerLayout}>
                    { completed ? 
                        <div className={styles.form}>
                            <h1 className={styles.head}>{PAYMENTPAGE.HEADER}</h1>
                            <p>{PAYMENTPAGE.NOTE}</p><br/>
                        </div>
                        :
                        <div className={styles.form}>
                            <h1 className={styles.head}>{REGISTERPAGE.HEADER}</h1>
                            <p>{REGISTERPAGE.TAGLINE}</p><br/>

                            { uploading ? 
                                    <CircularProgress disableShrink />
                                :
                                    <>
                                        <div className={styles.mb2}>
                                            <p>Picture*</p>
                                            <Button variant="contained" component="label" disabled={imageSelected}>
                                                <PhotoCamera /> Upload Picture
                                                <input hidden accept="image/*" multiple type="file" onChange={(e) => handleImageChange(e)} />
                                            </Button>
                                        </div>

                                        <div className={styles.mb2}>
                                            <p>Name*</p>
                                            <TextField InputProps={{ inputProps: { style: { color: '#fff' }}}} value={formData.name} id="name" name="name" onChange={(e) => handleChange(e)} />
                                        </div>

                                        <div className={styles.mb2}>
                                            <p>Mobile Number*</p>
                                            <TextField type="number" InputProps={{ inputProps: { style: { color: '#fff' }}}} value={formData.mobileNumber} id="mobileNumber" name="mobileNumber" onChange={(e) => handleChange(e)} />
                                        </div>

                                        <div className={styles.mb2}>
                                            <p>Age*</p>
                                            <TextField type="number" InputProps={{ inputProps: { style: { color: '#fff' }}}} value={formData.age} id="age" name="age" onChange={(e) => handleChange(e)} />
                                        </div>

                                        <div className={styles.mb2}>
                                            <p>Play Position*</p>
                                            <FormControl>
                                            <RadioGroup
                                                row
                                                name="row-radio-buttons-group"
                                                onChange={handleDesignationChange}
                                                defaultValue={playPosition}
                                            >
                                                <FormControlLabel value="AR" control={<Radio />} label="All Rounder"/>
                                                <FormControlLabel value="batter" control={<Radio />} label="Batter"/>
                                                <FormControlLabel value="bowler" control={<Radio />} label="bowler"/>
                                            </RadioGroup>
                                            </FormControl>
                                        </div>

                                        <div className={styles.mb2}>
                                            <p>Address*</p>
                                            <TextField InputProps={{ inputProps: { style: { color: '#fff' }}}} value={formData.address} multiline minRows={4} id="address" name="address" onChange={(e) => handleChange(e)} />
                                        </div>                

                                        <div className={styles.mb2}>
                                            <Button variant="contained" color="primary" component="span" onClick={handlePublish}>
                                                Register
                                            </Button>
                                        </div>
                                    </>
                            }

                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Register