import './App.css';
import Matches from './Matches';
import Table from './Table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useId } from 'react';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const now: Date = new Date();
  const start: Date = new Date(now.getFullYear(), 0, 0);
  const diff: number = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  const [currentRound, setCurrentRound] = useState<number>(
    Math.floor((day - 66) / 7)
  );

  const [URL, setURL] = useState(
    `https://api.squiggle.com.au/?q=games;year=2023;round=${currentRound}`
  );
  return (
    <div className="App">
      <div className="container">
        <QueryClientProvider client={client}>
          <Table id={useId()} setURL={setURL} URL={URL} />
          <Matches
            id={useId()}
            setURL={setURL}
            URL={URL}
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            now={now}
          />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
