import React, { useState } from "react";
import CapitalWeather from "../../components/CapitalWeather";
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

const Home: React.FC = () => {
  const [inputData, setInput] = useState<string>("");

  const [countryData, setCountry] = useState<ResultItem[]>([]);
  const [error, setError] = useState("");

  const handelSubmit = (e: React.FormEvent): void => {
    const link = `https://restcountries.com/v3.1/name/${inputData}`;

    fetch(link)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCountry(res.slice(0, 3));
      })
      .catch(() => {
        setError("Failed to fetch data");
      });
  };

  return (
    <>
      <div className="App">
        <h1 className="heading">Weather App</h1>

        <input
          className="inputBox"
          type="text"
          value={inputData}
          placeholder="Enter Country"
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="btn btn-dark inputButton"
          type="submit"
          disabled={!inputData}
          onClick={handelSubmit}
        >
          Submit
        </button>

        <div className="card_main">
          {error && <div>{error}</div>}
          {!error &&
            countryData?.map((item: ResultItem) => {
              return (
                <div key={item.population} className="cardPice">
                  <div>
                    <img
                      className="card m-2"
                      src={item.flags.png}
                      alt={item.flags.png}
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
};

export default Home;
