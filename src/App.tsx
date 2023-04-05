import './App.css';
import Matches from './Matches';
import Table from './Table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useId } from 'react';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <div className="App">
      <div className="container">
        <QueryClientProvider client={client}>
          <Table id={useId()} />
          <Matches id={useId()} />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
