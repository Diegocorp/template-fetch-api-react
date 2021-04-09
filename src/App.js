import logo from './logo.svg';
import './App.css';
import useFetchData from './useFetchData';

function App() {
  const { data, loading, error } = useFetchData();

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {data && <h1>{data.length}</h1>}
    </div>
  );
}

export default App;
