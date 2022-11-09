import axios from "axios";
import { useEffect, useState } from "react";

const SearchCountry = ({ onChange, value }) => {
  return (
    <p>find countries <input onChange={onChange} value={value} /></p>
  )
}
const Detail = ({country})=>{
  return (
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <img alt="" src={country.flags.png}></img>
        <h2>languages</h2>
        <ul>
          {country.languages.map((e) => <li key={e.name}>{e.name}</li>)}
        </ul>
      </div>
  )
}
const Dispay = ({ countries }) => {
  console.log(countries)

  if (countries.length > 10) {
    return (
      <div>to many match, spacify another filter</div>
    )
  }
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map((e) => <p>{e.name}</p>)}
      </div>
    )
  }
  if (countries.length === 1) {
    return (
      <div>
        <Detail country = {countries[0]}/>
      </div>
    )
  }
  return (
    <div></div>
  )
}
function App() {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => setCountries(response.data))
  }, [])
  const [countryName, setCountryName] = useState('')
  const onChangeInputCountry = (event) => {
    const value = event.target.value
    setCountryName(value)
  }
  const filter = countries.filter((e) => {
    return e.name.includes(countryName)
  })
  return (
    <div>
      <SearchCountry onChange={onChangeInputCountry} value={countryName} />
      <Dispay countries={filter} />
    </div>
  );
}

export default App;
