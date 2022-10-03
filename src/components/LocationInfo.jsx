import React from 'react'
import './styles/locationInfo.css'

const LocationInfo = ({ location }) => {



    return (
        <article className='location__card'>
            <ul className='location__list'>
                <li className='location__item'><span>Name: </span>{location?.name}</li>
                <li className='location__item'><span>Type: </span>{location?.type}</li>
                <li className='location__item'><span>Dimension: </span>{location?.dimension}</li>
                <li className='location__item'><span>Population: </span>{location?.residents.length}</li>
            </ul>
        </article>
    )
}

export default LocationInfo