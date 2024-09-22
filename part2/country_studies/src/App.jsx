import { useEffect, useState } from "react"
import withResultsList from "./mocks/list-of-countries.json"
import weather from "./mocks/weather-response.json"
import axios from "axios"

function App() {
  //console.log(import.meta.env.VITE_WEATHER_API_KEY)

  //const [countryList, setCountryList] = useState(withResultsList)

  //const countryList = withResultsList

  useEffect(() => {
    axios.get(import.meta.env.VITE_COUNTRIES_URL).then((response) => {
      setCountryList(response.data)
    })
  }, [])

  const [countryList, setCountryList] = useState([])
  const [filter, setFilter] = useState("")
  //const [countryList, setCountryList] = useState(withResultsCountry)
  const filteredCountryList =
    filter !== ""
      ? countryList.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      : countryList

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const Results = () => {
    if (filter === "") return ""

    if (filteredCountryList.length === 0)
      return <p>No results. Please, try another search.</p>

    if (filteredCountryList.length > 10)
      return <p>Too many matches, please specify another filter.</p>

    if (filteredCountryList.length > 1 && filteredCountryList.length <= 10) {
      return <CountryList data={filteredCountryList} />
    }
    if (filteredCountryList.length === 1) {
      return <Country data={filteredCountryList[0]} />
    }
  }
  const CountryList = ({ data }) => {
    const handleShowClick = (name) => {
      const newFilter = name
      setFilter(newFilter)
    }
    return data.map((country) => (
      <p key={country.cca2}>
        {country.name.common} ({country.name.official}){" "}
        <button
          type="button"
          onClick={() => handleShowClick(country.name.common)}
        >
          show
        </button>
      </p>
    ))
  }
  const Country = ({ data }) => {

    const [weather, setWeather] = useState(null)
    useEffect(() => {
      //console.log(data);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        )
        .then((response) => {

          setWeather({
            name: response.data.name,
            kelvin: response.data.main.temp,
            icon: response.data.weather[0].icon,
            description: response.data.weather[0].description,
            speed: response.data.wind.speed,
          })
          console.log("Getting weather info...",weather);

        })
    }, [])

    console.log(data)
    return (
      <div>
        <h1>{data.name.common}</h1>
        <p>Capital: {data.capital}</p>
        <p>Area: {data.area} km2</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(data.languages).map((key) => {
            return <li key={key}>{key}</li>
          })}
        </ul>
        <img src={data.flags.png} alt={data.flags.alt} />
        {weather && <Weather weather={weather} />}
      </div>
    )
  }

  const Weather = ({ weather }) => {
    //AÑADIR RENDERIZADO CONDICIONAL
    console.log(weather);
    
    return (
      <div>
        <h2>Weather in {weather.name}</h2>
        <p>
          Temperature: {Math.round(weather.kelvin - 273.15)}ºC ({weather.kelvin}{" "}
          Kelvin)
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
        <p>Wind: {weather.speed} m/s</p>
      </div>
    )
  }
  return (
    <>
      <div>
        <span>Find countries: </span>
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <Results />
    </>
  )
}

export default App
