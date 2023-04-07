import './App.css';
import Matches from './Matches';
import Table from './Table';
import Match from './Match';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, createContext } from 'react';

export const AppContext = createContext<{
  URL: string;
  matchID: string;
  setURL: React.Dispatch<React.SetStateAction<string>>;
  setButtonSet: React.Dispatch<React.SetStateAction<string>>;
  setMatchID: React.Dispatch<React.SetStateAction<string>>;
}>({
  URL: '',
  matchID: '',
  setURL: () => {},
  setButtonSet: () => {},
  setMatchID: () => {},
});

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [buttonsSet, setButtonSet] = useState('rounds');
  const [matchID, setMatchID] = useState('');

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
          <AppContext.Provider
            value={{ URL, setURL, setButtonSet, matchID, setMatchID }}
          >
            <Table />
            {(buttonsSet === 'rounds' || buttonsSet === 'teamMatches') && (
              <Matches
                currentRound={currentRound}
                setCurrentRound={setCurrentRound}
                now={now}
              />
            )}
            {buttonsSet === 'matchInfo' && <Match></Match>}
          </AppContext.Provider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
