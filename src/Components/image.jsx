import { useState, useEffect } from 'react';
import Score from './Score';
import '../Styles/image.css';

function Image() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=12'
        );
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(poke.url);
            const info = await res.json();
            return { ...info, clicked: false }; // add clicked flag
          })
        );

        setPokemon(detailedData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  // Shuffle helper
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Handle click
  const handleClick = (id) => {
    const clickedPokemon = pokemon.find((p) => p.id === id);

    if (clickedPokemon.clicked) {
      // Game over: update max score and reset everything
      setMaxScore((prevMax) => Math.max(prevMax, score));
      setScore(0);
      setPokemon((prev) =>
        prev.map((p) => ({
          ...p,
          clicked: false,
        }))
      );
    } else {
      // Mark as clicked, increment score, shuffle
      setScore(score + 1);
      setPokemon((prev) =>
        shuffleArray(
          prev.map((p) => (p.id === id ? { ...p, clicked: true } : p))
        )
      );
    }
  };

  if (pokemon.length === 0) return <p>Loading Pokémon...</p>;

  return (
    <div>
      <Score score={score} maxScore={maxScore} />
      <div className="pokemon-grid">
        {pokemon.map((p) => (
          <div
            key={p.id}
            className="pokemon-card"
            onClick={() => handleClick(p.id)}
            style={{ cursor: 'pointer' }}
          >
            <h4>{p.name}</h4>
            <img src={p.sprites.front_default} alt={p.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Image;
