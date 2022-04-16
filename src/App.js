import { useState, useEffect } from 'react';
import './App.css';
import { db } from "./firebase-config"
import { collection, addDoc, getDocs } from "firebase/firestore"

function App() {

  const [newMaterialDescription, setNewMaterialDescription] = useState("");
  const [newHSNCode, setNewHSNCode] = useState(0);
  const [newGSTRate, setNewGSTRate] = useState(0);
  const [materials, setMaterials] = useState([]);

  const materialsCollectionRef = collection(db, "Materials")

  //add materials to db
  const addMaterials = async () => {
    await addDoc(materialsCollectionRef, { MaterialDescription: newMaterialDescription, HSNCode: Number(newHSNCode), GSTRate: Number(newGSTRate) })
    window.alert('New Material Added');
    document.location.reload(true);
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

    <div className="App">

      
        <input placeholder='material description' onChange={(event) => { setNewMaterialDescription(event.target.value) }}></input>
        <input placeholder='HSN Code' type='number' onChange={(event) => { setNewHSNCode(event.target.value) }}></input>
        <input placeholder='GST Rate' type='number' onChange={(event) => { setNewGSTRate(event.target.value) }}></input>
        <button className='btn btn-primary' onClick={addMaterials} >Add Material</button>
     

    <br></br>

      
        <table>
          <thead>
            <tr>
              <th>Material Name</th>
              <th>HSN Code</th>
              <th>GST Rate</th>
            </tr>
          </thead>

          {materials.map((material) => {
            return (
              <tbody key={material.MaterialDescription}>
                <tr>
                  <td>{material.MaterialDescription}</td>
                  <td>{material.HSNCode}</td>
                  <td>{material.GSTRate * 100}%</td>
                </tr>
              </tbody>
            )
          })}

        </table>
      </div>
    

  );
}

export default App;
