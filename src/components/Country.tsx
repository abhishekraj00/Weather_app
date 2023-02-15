 import React, { useEffect, useState } from 'react'

// interface Props {
//     countryData:[]
// }
// const Country:React.FC<Props> = ({countryData}) => {

//     const [apiData,setApiData] = useState<unknown>('');

//     // useEffect(()=>{
//     //     let url:string = `https://api.weatherapi.com/v1/current.json?key=dd1334ccb0e64fc0a99144806231402&q=${inputData}&aqi=no`;

//     //     async function getData(){
//     //         let data = await axios.get(url);
//     //         let d = await data.data;
//     //         setApiData(d)
//     //     }

//     // },[])

//   return (
//    <>
//      <div className="d-flex p-2 m-4 flex-wrap ">
//       {countryData?.map((item) => {
//         return (
//           <div className="card cardPice">
//             <h3>{item.name.common}</h3>
//             <div>
//               <img
//                 className="card m-2"
//                 src={item.flags.png}
//                 alt={item.flags.png}
//                 width="120px"
//                 height="50px"
//               />
//             </div>
//             <div>
//               <b>Capital</b>: {item.capital}
//             </div>
//             <div>
//               <b>population</b>: {item.population}
//             </div>
//             <div>
//               <b>latitude</b>: {item.latlng[0]}
//             </div>
//             <div>
//               <b>Longitude</b>: {item.latlng[1]}
//             </div>
//             {/* <CapitalWeather capital={item.capital} /> */}
//           </div>
//         );
//       })}
//     </div>
//    </>
//   )
// }

// export default Country