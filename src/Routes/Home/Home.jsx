import React, { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
  const [leagueGroups, setLeagueGroups] = useState(null);
  const token = 'f5a4eb523f66fcc1cf73eb8874eafecf518c433320326f74bdfb54f9006db584';
  const url = 'https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=f5a4eb523f66fcc1cf73eb8874eafecf518c433320326f74bdfb54f9006db584&from=2024-02-13&to=2024-02-13';

  const targetLeagues = [
    { name: "Premier League", league_key: 152 },
    { name: "La Liga", league_key: 302 },
    { name: "Serie A", league_key: 207 },
    { name: "Bundesliga", league_key: 175 },
    { name: "Ligue 1", league_key: 168 },
    { name: "Copa de la Liga", league_key: 44 },
    { name: "Preolímpico Sudamericano SUB-23", league_key: 10608 },
    { name: "Liga Mexico", league_key: 235 },
    { name: "Liga Colombia", league_key: 120 },
    { name: "Liga Paraguay", league_key: 255 },
    { name: "UEFA Champions League", league_key: 3 }
  ];

  useEffect(() => {
    bringInfo();
  }, []);

  const bringInfo = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
      }
      const data = await response.json();
  
      const groupedLeagues = {};
  
      data.result.forEach(match => {
        const leagueKey = match.league_key;
        const leagueInfo = targetLeagues.find(league => league.league_key === leagueKey);
  
        if (leagueInfo) {
          // Verificar si la liga ya está en el objeto groupedLeagues
          if (groupedLeagues[leagueKey]) {
            // Si existe, agregar el partido a la lista existente
            groupedLeagues[leagueKey].matches.push(match);
          } else {
            // Si no existe, crear una nueva entrada
            const leagueName = leagueInfo.name;
  
            groupedLeagues[leagueKey] = {
              name: leagueName,
              matches: [match],
            };
          }
        }
      });
  
      // Ahora, groupedLeagues contiene las ligas agrupadas por event_country_key
      setLeagueGroups(groupedLeagues);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  console.log(leagueGroups)


  return (
    <div className='container-home'>
      <div className='supposedlyAds'></div>
      <div className='body-of-home-info'>
        {/* No se agregan divs, solo se manejan datos internamente */}
      </div>
      <div className='supposedlyAds'></div>
    </div>
  );
}