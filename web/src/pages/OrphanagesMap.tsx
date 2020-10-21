import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

import '../styles/pages/orphanages-map.css'

interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Olinda</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>

            <Map 
                center={[-7.9888384,-34.8454912]}
                zoom={14}
                style={{height: '100%', width: '100%'}}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}