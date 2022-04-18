import { useState, useEffect } from 'react';
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

export default function Companies(){

    const [companies, setCompany] = useState([]);
    const [newCompanyName, setNewCompanyName]=useState("");
    const [newGSTNumber, setNewGSTNumber]=useState("");
    const [newAddress, setNewAddress]=useState("");

    const companyCollectionRef = collection(db, "Companies")

    //add company to db
    const addCompany = async () => {
        if(newCompanyName===""){
            window.alert("Company Name cannot be empty");
        } else if (newGSTNumber===""){
            window.alert("GST Number cannot be empty");
        } else if (newAddress===""){
            window.alert("Address cannot be empty");
        } else {
        //adding values to db
        await addDoc(companyCollectionRef, {CompanyName : newCompanyName, GSTNumber : newGSTNumber, Address : newAddress})
        window.alert('New Company added');
        document.location.reload(true);
        }

    }

    useEffect(()=>{

        //get materials from db
        const getCompanies = async()=>{
            const data = await getDocs(companyCollectionRef)
            setCompany(data.docs.map((doc)=>({
                ...doc.data(), id: doc.id
            })))
        }
        getCompanies()
        // eslint-disable-next-line
    }, []);

    return(
        <div className='Companies'>
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
              LIST OF ALL COMPANIES
          </Typography>
                </Paper>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 , maxWidth: 800}} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold' ,minWidth:150}}>Company Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold' ,minWidth:170}}>GST Number</TableCell>
                            <TableCell sx={{fontWeight: 'bold' }}>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => {
                            return (
                                <TableRow hover key={company.CompanyName}>
                                    <TableCell>{company.CompanyName}</TableCell>
                                    <TableCell>{company.GSTNumber}</TableCell>
                                    <TableCell>{company.Address}</TableCell>
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
            <Card id='card' sx={{ minWidth: 275, maxWidth: 700, padding: 1 }}>
                
                <Paper style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: '#0275d8',
                    padding : '15px'
                }}>
                    <Typography variant="h5"
          style={{ display: "flex", justifyContent: "center" ,color:'white'}}>
              ADD NEW COMPANY
          </Typography>
                </Paper>
                <TextField type='text' id="outlined-basic" fullWidth margin="dense" label="Company Name" variant="outlined" onChange={(event) => { setNewCompanyName(event.target.value) }} />
                <TextField type='text' id="outlined-basic" fullWidth margin="dense" label="GST Number" variant="outlined" onChange={(event) => { setNewGSTNumber(event.target.value) }} />
                <TextField type='text' id="outlined-basic" fullWidth margin="dense" label="Address" variant="outlined" onChange={(event) => { setNewAddress(event.target.value) }} />

                <Button variant="contained" onClick={addCompany} sx={{marginTop:2, marginBottom:2}}>Add</Button>
                
            </Card>
            </div>
 

        </div>
    );
}