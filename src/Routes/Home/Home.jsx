import { useEffect, useState } from 'react';
import './Home.css';

export default function Home() {
  const apiKey = '3eb4e79d93msh37313a4eb025e19p14fa92jsn8327a90ee79a';
  const date = '2024-02-17';
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}`;

  const targetLeagues = [
    { league: "Copa de la Liga Profesional", id: 1032, country: "Argentina", partidos: {} },
    { league: "Primera B Metropolitana", id: 131, country: "Argentina", partidos: {} },
    { league: "Primera Nacional", id: 129, country: "Argentina", partidos: {} },
    { league: "Premier League", id: 39, country: "England", partidos: {} },
    { league: "Ligue 1", id: 61, country: "France", partidos: {} },
    { league: "La Liga", id: 140, country: "Spain", partidos: {} },
    { league: "Serie A", id: 135, country: "Italy", partidos: {} },
    { league: "Bundesliga", id: 78, country: "Germany", partidos: {} },
    { league: "Primera División", id: 265, country: "Chile", partidos: {} },
    { league: "Liga MX", id: 262, country: "Mexico", },
    { league: "Primera A", id: 239, country: "Colombia", partidos: {} },
    { league: "Division Profesional - Apertura", id: 250, country: "Paraguay", partidos: {} }
  ];

  const [leagueMatches, setLeagueMatches] = useState({});

  useEffect(() => {
    bringInfo();
  }, []);

  const bringInfo = async () => {
    try {

      const response = await fetch(url, {
        method: 'GET',
        params: { live: 'all' },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
      }
      const data = await response.json();
      const updatedLeagueMatches = {};

      targetLeagues.forEach(targetLeague => {
        const leagueName = targetLeague.league;
        const leagueCountry = targetLeague.country; // Nueva línea para obtener el nombre del país
        const leagueMatches = data.response.filter(match => match.league.id === targetLeague.id);
        
        // Utilizamos la propiedad 'league' como clave en updatedLeagueMatches
        updatedLeagueMatches[leagueName] = {
          leagueId: targetLeague.id,
          country: leagueCountry, // Agregamos la propiedad 'country' al objeto
          matches: leagueMatches,
        };
      });

      setLeagueMatches(updatedLeagueMatches);

    } catch (error) {
      console.log('Error: ', error);
    }
  };
  console.log(leagueMatches)

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
















/*
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
    
    */