import useFetch from './useFetch';
interface Props {
  id: string;
}

interface Team {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  pts: number;
}

const Table = (props: Props) => {
  const { data: teams } = useFetch(
    'https://api.squiggle.com.au/?q=standings',
    props.id
  );
  return (
    <div className="standings">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th></th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams?.standings.map((team: Team, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <img
                  className="logo"
                  src={`./imgs/${team.name}.png`}
                  alt={team.name}
                />
              </td>
              <td>{team.name}</td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
