import { useEffect, useState } from 'react'
import './App.css'
import getRandomNumber from './utils/getRandomNumber'
import axios from 'axios'
import LocationInfo from './components/LocationInfo'
import CardResident from './components/CardResident'
import FilterList from './components/FilterList'
import Error from './components/Error'

function App() {

  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if (searchInput) {
      id = searchInput
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => setHasError(true))
  }, [searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    /*setSearchInput(event.target.locationId.value)*/
  }

  const handleChange = event => {

    if (event.target.value === '') {
      return setSuggestedList()
    } else {

      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => err)
    }
  }

  return (
    <div className="App">
      <h1>Rick and Morty</h1>
      <form onSubmit={handleSubmit} autoComplete="new-password">
        <input id='locationId' placeholder='Search location' type="text" onChange={handleChange} autoComplete="new-password" />

        <FilterList suggestedList={suggestedList} setSearchInput={setSearchInput} />
      </form>
      {
        hasError
          ?
          <Error />
          :
          <>
            <LocationInfo location={location} />
            <div className='card__container'>
              {
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
