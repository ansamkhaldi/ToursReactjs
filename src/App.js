import React, { useState, useEffect } from 'react';
import './App.css';
import Loading from './components/Loading/Loading';
import Tours from './components/Tours/Tours';

//const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://course-api.com/react-tours-project'
      );
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error + 'name');
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  return (
    <div className="App">
      {loading ? (
        <main>
          <Loading />
        </main>
      ) : tours.length === 0 ? (
        <main>
          <div className="title">
            <h2>no tours left</h2>
            <button className="btn" onClick={() => fetchTours()}>
              refresh
            </button>
          </div>
        </main>
      ) : (
        <main>
          <Tours tours={tours} removeTour={removeTour} />
        </main>
      )}
    </div>
  );
}

export default App;
