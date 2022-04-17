import { useState, useEffect } from 'react';
import './Materials.css';
import { db } from "../firebase-config"
import { collection, addDoc, getDocs } from "firebase/firestore"

//material UI Imports
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';

export default function Materials() {

    const [newMaterialDescription, setNewMaterialDescription] = useState("");
    const [newHSNCode, setNewHSNCode] = useState(0);
    const [newGSTRate, setNewGSTRate] = useState(0);
    const [materials, setMaterials] = useState([]);

    const materialsCollectionRef = collection(db, "Materials")

    //add materials to db
    const addMaterials = async () => {
        //validation
        if(newMaterialDescription===""){
            window.alert('Material cannot be empty');
        } else if(newHSNCode===0){
            window.alert('HSN Code cannot be empty');
        } else if(newGSTRate===0){
            window.alert('GSt Rate cannot be empty');
        } else {
        //adding value
        await addDoc(materialsCollectionRef, { MaterialDescription: newMaterialDescription, HSNCode: Number(newHSNCode), GSTRate: Number(newGSTRate) })
        window.alert('New Material Added');
        document.location.reload(true);
        }   
    }

    useEffect(() => {

        //get materials from db
        const getMaterials = async () => {
            const data = await getDocs(materialsCollectionRef)
            setMaterials(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
            console.log(data)
        }

        getMaterials()
        // eslint-disable-next-line
    }, []);

    return (

        <div>
            <div
            style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
            <Card sx={{ minWidth: 275, maxWidth: 700, padding: 1 ,marginTop: 2}} >
            <Paper style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: '#0275d8',
                    padding : '15px'
                }}>
                    <Typography variant="h5"
          style={{ display: "flex", justifyContent: "center" ,color:'white'}}>
              LIST OF ALL MATERIALS
          </Typography>
                </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 , maxWidth: 800}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Material Description</TableCell>
                            <TableCell >HSN Code</TableCell>
                            <TableCell >GST Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material) => {
                            return (
                                <TableRow key={material.MaterialDescription}>

                                    <TableCell>{material.MaterialDescription}</TableCell>
                                    <TableCell>{material.HSNCode}</TableCell>
                                    <TableCell>{material.GSTRate * 100}%</TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </Card>
            </div>
            
            <br/><br/>
            <div
            style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
            <Card id='card' sx={{ minWidth: 500, maxWidth: 700, padding: 1 }}>
                
                <Paper style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: '#0275d8',
                    padding : '15px'
                }}>
                    <Typography variant="h5"
          style={{ display: "flex", justifyContent: "center" ,color:'white'}}>
              ADD NEW MATERIAL
          </Typography>
                </Paper>
                <TextField type='text' id="outlined-basic" fullWidth margin="dense" label="Material Description eg. Brass Scrap" variant="outlined" onChange={(event) => { setNewMaterialDescription(event.target.value) }} />
                <TextField type='number' id="outlined-basic" fullWidth margin="dense" label="HSN Code eg.12340010" variant="outlined" onChange={(event) => { setNewHSNCode(event.target.value) }} />
                <TextField type='number' id="outlined-basic" fullWidth margin="dense" label="GST Code eq.0.12" variant="outlined" onChange={(event) => { setNewGSTRate(event.target.value) }} />

                <Button variant="contained" onClick={addMaterials} sx={{marginTop:2, marginBottom:2}}>Add Material</Button>
                
            </Card>
            </div>
        </div>
    );
}