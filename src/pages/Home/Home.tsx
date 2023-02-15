import React, { useEffect, useState } from "react";
import CapitalWeather from "../../components/CapitalWeather";
import { getApiData } from "../../utils/Api";
import "./home.css";

interface ResultItem {
  name: {
    common: string;
  };
  capital: string[];
  latlng: number[];
  flags: {
    png: string;
    alt: string;
  };
  population: number;
}

function Home() {
  const [inputData, setInput] = useState<string>("");

  const [callApi, setCall] = useState(false);
  const [countryData, setCountry] = useState<ResultItem[]>([]);

  useEffect(() => {
    if (!inputData) {
      setCountry([]);
    }
  }, [inputData]);

  useEffect(() => {
    const link = `https://restcountries.com/v3.1/name/${inputData}`;
    inputData &&
      getApiData(link).then((res) => {
        setCountry(res.data.slice(0, 4));
      });
  }, [callApi]);

  const handelSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setCall(!callApi);
  };

  return (
    <>
      <div className="App">
        <h1 className="heading">Weather App</h1>

        {/* From elements */}
        <form onSubmit={handelSubmit}>
          <input
            className="inputBox"
            type="text"
            value={inputData}
            placeholder="Enter Country"
            onChange={(e) => setInput(e.target.value)}
          />
          {inputData && (
            <button className="btn btn-dark inputButton" type="submit">
              Submit
            </button>
          )}
        </form>

        <div className="card_main">
          {countryData &&
            countryData.map((item: ResultItem) => {
              return (
                <div key={item.population} className="card cardPice">
                  <h3>{item.name.common}</h3>
                  <div>
                    <img
                      className="card m-2"
                      src={item.flags.png}
                      alt={item.flags.png}
                      width="120px"
                      height="50px"
                    />
                  </div>
                  <div>
                    <b>Capital</b>: {item.capital[0]}
                  </div>
                  <div>
                    <b>population</b>: {item.population}
                  </div>
                  <div>
                    <b>latitude</b>: {item.latlng[0]}
                  </div>
                  <div>
                    <b>Longitude</b>: {item.latlng[1]}
                  </div>
                  <CapitalWeather capital={item.capital[0]} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
