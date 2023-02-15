import { useEffect, useState } from "react";
import { getApiData } from "../utils/Api";

type propsData = {
  capital: string;
};

interface ResultItem {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_kph: number;
  precip_in: number;
}

function CapitalWeather({ capital }: propsData) {
  const [capitalName, setCapital] = useState<ResultItem>();

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let url = `https://api.weatherapi.com/v1/current.json?key=dd1334ccb0e64fc0a99144806231402&q=${capital}`;
    getApiData(url).then((res) => {
      setCapital(res.data.current);
    });
  });

  return (
    <>
      <button
        className="btn btn-dark mt-4 mb-2 p-2"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? "❌" : "Capital Weather"}
      </button>

      {toggle && (
        <div className="card p-2 m-2">
          <div>
            <img src={capitalName?.condition.icon} />
            {capitalName?.temp_c}
            <sup>o</sup>C
          </div>
          {capitalName?.condition.text}
          <div>
            <b>wind_speed : </b>
            {capitalName?.wind_kph}km/h
          </div>
          <div>
            <b>precipitation : </b>
            {capitalName?.precip_in}
          </div>
        </div>
      )}
    </>
  );
}

export default CapitalWeather;
