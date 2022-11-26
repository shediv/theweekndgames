import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../services/firebase";
import Button from '@material-ui/core/Button';

export default function DeleteArticle({ id, imageUrl }) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            try {
                await deleteDoc(doc(db, "players", id));
                toast("file deleted successfully", { type: "success" });
                const storageRef = ref(storage, imageUrl);
                await deleteObject(storageRef);
            } catch (error) {
                toast("Error in deleting file", { type: "error" });
                console.log(error);
            }
        }
    };
    const handleApprove = async () => {
        if (window.confirm("Are you sure you want approve this player?")) {
            try {
                const docRef = doc(db, 'players', id);
                await updateDoc(docRef, {approved: true});
                alert("Approved player successfully");

            } catch (error) {
                toast("Error in deleting file", { type: "error" });
                console.log(error);
            }
        }
    };
    return (
        <>
            <Button onClick={handleApprove} size="small" color="primary" variant="contained">
                Approve
            </Button>
            <Button onClick={handleDelete} size="small" color="secondary" variant="contained">
                Delete
            </Button>
        </>        
    );
}