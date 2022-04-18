import { Card } from "@mui/material";
import companyimage from "../OtherItems/companydemo.jpg";

export default function HomePage(){
    return(
        <div className='HomePage'>
            <Card><img src={companyimage} alt={'company'} width='1500' height='1000'/></Card>
        

        </div>
    );
}