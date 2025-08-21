// src/Score.jsx
function Score({ score, maxScore }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2>Score: {score}</h2>
      <h3>Max Score: {maxScore}</h3>
    </div>
  );
}

export default Score;
