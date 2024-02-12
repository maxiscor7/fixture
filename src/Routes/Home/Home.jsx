import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {

  const [resultsApi, setResultsApi] = useState(null)
  const token = 'f5a4eb523f66fcc1cf73eb8874eafecf518c433320326f74bdfb54f9006db584'
  const url = 'https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=f5a4eb523f66fcc1cf73eb8874eafecf518c433320326f74bdfb54f9006db584&from=2024-02-11&to=2024-02-11'

  useEffect(() => {
    bringInfo()
  }, [])

  const bringInfo = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`)
      }
      const data = await response.json();
      console.log('Datos de la api: ', data.result)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <div className='container-home'>
      <div className='supposedlyAds'></div>
      <div className='body-of-home-info'>

      </div>
      <div className='supposedlyAds'></div>
    </div>
  )
}
