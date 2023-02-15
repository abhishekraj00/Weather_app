import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface ResultItem {
    name:{
        common:string,
    },
    capital:string[],
    latlng:number[],
    flags:{
        png:string,
        alt:string,
    }
    population:number
  }
  

function Home() {
    const [inputData,setInput] = useState<string>("");
    const [countryData,setCountry] = useState<ResultItem[]>([]);

    useEffect(()=>{
        inputData && axios.get(`https://restcountries.com/v3.1/name/${inputData}`).then((res)=>{
        setCountry(res.data);
      })
    },[inputData])
  
    const handelSubmit = (e: React.FormEvent):void =>{
      e.preventDefault();
    }
  
  return (
    <>
    <div className="App">
      <h1 className="heading">Weather App</h1>

      {/* From elements */}
      <form onSubmit={handelSubmit}>
      <input className='inputBox' type="text" value={inputData} placeholder='Enter Country' onChange={(e)=>setInput(e.target.value)} />
      {inputData && <button className='btn btn-dark inputButton' type="submit">Submit</button>}
      </form>

      {
        countryData && countryData.map((item:ResultItem)=>{
            return <div>{item.name.common}</div>
        })
      }


    </div>
    
    </>
  )
}

export default Home