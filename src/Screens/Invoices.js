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
import { TablePagination, Typography } from '@mui/material';

export default function Invoices() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [invoices, setInvoices] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [newBuyername , setNewBuyerName] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newGstNumber , setNewGstNumber] = useState("");
    const [newHsnCode , setNewHsnCode] = useState(0);
    const [newInvoiceNumber ,setNewInvoiceNumber] = useState(0);
    const [newMaterialDescription , setNewMaterialDescription] = useState("");
    const [newQuantity , setNewQuantity] = useState(0);
    const [newRate , setNewRate] = useState(0);
    const [newRateOfTax , setNewRateOfTax] = useState(0);
    const [newUnit , setNewUnit] = useState("");
    const [newVehicleNumber , setNewVehicleNumber] = useState("");
    
    const invoiceCollectionRef = collection(db, "Invoices");
    const materialsCollectionRef = collection(db, "Materials")

    //add invoices to db
    const addInvoice = async () => {
        //validation
        if(newInvoiceNumber===0){
            window.alert('Invoice Number cannot be empty');
        } else if(newDate===""){
            window.alert('Date cannot be empty');
        } else {
        //adding value
        await addDoc(invoiceCollectionRef, 
            { 
                BuyerName: newBuyername,
                Date : newDate,
                GSTNumber : newGstNumber,
                HSNCode : Number(newHsnCode),
                InvoiceNumber : Number(newInvoiceNumber),
                MaterialDescription : newMaterialDescription,
                Quantity : Number(newQuantity),
                Rate : Number(newRate),
                RateOfTax : Number(newRateOfTax),
                Unit : newUnit,
                VehicleNumber : newVehicleNumber
            })
        
        window.alert('New Invoice Added');
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
        }

        getMaterials()

        //get invoices from db
        const getInvoices = async () => {
            const data = await getDocs(invoiceCollectionRef)
            setInvoices(data.docs.map((doc)=>({
                ...doc.data(), id: doc.id
            })))
        }

        getInvoices()
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

        <Card sx={{ minWidth: 275, maxWidth: 1250, padding: 1 ,marginTop: 2}} >
            <Paper style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: '#0275d8',
                    padding : '15px'
                }}>
                    <Typography variant="h5"
          style={{ display: "flex", justifyContent: "center" ,color:'white'}}>
              LIST OF ALL INVOICES
          </Typography>
                </Paper>
                <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 , maxWidth: 1500}} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold', minWidth: 140}}>Invoice Number</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth: 150}}>Date</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth: 200}}>Buyer Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>GST Number</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:200}}>Material Description</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:110}}>HSN Code</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Quantity</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Unit</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Rate</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Amount</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:110}}>Rate of Tax</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:120}}>Tax Amount</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:140}}>Invoice Amount</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:140}}>Vehicle Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice) => {
                            return (
                                <TableRow hover key={invoice.InvoiceNumber}>
                                    <TableCell>{invoice.InvoiceNumber}</TableCell>
                                    <TableCell>{invoice.Date}</TableCell>
                                    <TableCell>{invoice.BuyerName}</TableCell>
                                    <TableCell>{invoice.GSTNumber}</TableCell>
                                    <TableCell>{invoice.MaterialDescription}</TableCell>
                                    <TableCell>{invoice.HSNCode}</TableCell>
                                    <TableCell>{invoice.Quantity}</TableCell>
                                    <TableCell>{invoice.Unit}</TableCell>
                                    <TableCell>{invoice.Rate}</TableCell>
                                    <TableCell>{invoice.Quantity * invoice.Rate}</TableCell>
                                    <TableCell>{invoice.RateOfTax * 100}%</TableCell>
                                    <TableCell>{invoice.Quantity * invoice.Rate * invoice.RateOfTax}</TableCell>
                                    <TableCell>{((invoice.Quantity * invoice.Rate)+(invoice.Quantity * invoice.Rate * invoice.RateOfTax))}</TableCell>
                                    <TableCell>{invoice.VehicleNumber}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
            rowsPerPageOptions={[5,10, 50, { value: -1, label: 'All' }]}
            component="div"
            count={invoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} 
            />
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
              ADD NEW INVOICE
          </Typography>
                </Paper>
                <TextField type='number' id="outlined-basic" margin="dense" sx={{marginRight: 2}} label="Invoice Number" variant="outlined" onChange={(event) => { setNewInvoiceNumber(event.target.value) }} />
                <TextField type='date' id="outlined-basic" margin="dense" label="Date" variant="outlined" onChange={(event) => { setNewDate(event.target.value) }} InputLabelProps={{ shrink: true }}/>
                <TextField type='string' id="outlined-basic" margin="dense" fullWidth label="Buyer Name" variant="outlined" onChange={(event) => { setNewBuyerName(event.target.value) }} />
                <TextField type='string' id="outlined-basic" margin="dense" fullWidth label="GST Number" variant="outlined" onChange={(event) => { setNewGstNumber(event.target.value) }} />
                <TextField type='string' id="outlined-basic" margin="dense" fullWidth label="Material Description" variant="outlined" onChange={(event) => { setNewMaterialDescription(event.target.value) }} />
                <TextField type='number' id="outlined-basic" margin="dense" fullWidth label="HSN Code" variant="outlined" onChange={(event) => { setNewHsnCode(event.target.value) }} />
                <TextField type='number' id="outlined-basic" margin="dense" sx={{marginRight: 2}} label="Quantity" variant="outlined" onChange={(event) => { setNewQuantity(event.target.value) }} />
                <TextField type='string' id="outlined-basic" margin="dense" label="Unit" variant="outlined" onChange={(event) => { setNewUnit(event.target.value) }} />
                <TextField type='number' id="outlined-basic" margin="dense" sx={{marginRight: 2}} label="Rate" variant="outlined" onChange={(event) => { setNewRate(event.target.value) }} />
                <TextField type='number' id="outlined-basic" margin="dense" label="Rate of Tax" variant="outlined" onChange={(event) => { setNewRateOfTax(event.target.value/100) }} />
                <TextField type='string' id="outlined-basic" margin="dense" fullWidth label="vehicle Number" variant="outlined" onChange={(event) => { setNewVehicleNumber(event.target.value) }} />
                
                <Button variant="contained" onClick={addInvoice} sx={{marginTop:2, marginBottom:2}}>Add</Button>
                
            </Card>
            </div>

        </div>
    )

}