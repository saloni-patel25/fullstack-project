import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const result = await axios.post('https://your-backend.herokuapp.com/bfhl', { data: JSON.parse(input) });
      setResponse(result.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON or API error');
      setResponse(null);
    }
  };

  return (
    <div className="App">
      <h1>Data Processor</h1>
      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON data here, e.g., {"data":["A","C","z"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <select multiple onChange={(e) => setFilter(Array.from(e.target.selectedOptions, option => option.value))}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <div>
            {filter.includes('numbers') && response.numbers && <pre>{JSON.stringify(response.numbers, null, 2)}</pre>}
            {filter.includes('alphabets') && response.alphabets && <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>}
            {filter.includes('highest_alphabet') && response.highest_alphabet && <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
