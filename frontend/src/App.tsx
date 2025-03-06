import { useEffect, useState } from 'react';
import teamData from './CollegeBasketballTeams.json';

// Define the structure of a team
interface Team {
  tid: number;
  school: string;
  name: string;
  city: string;
  state: string;
}

// The main App component
const App = () => {
  const [teams, setTeams] = useState<Team[]>(teamData.teams);

  // Load JSON data
  useEffect(() => {
    fetch('./CollegeBasketballTeams.json')
      .then((response) => response.json())
      .then((data) => setTeams(data.teams))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <TeamList teams={teams} />
    </div>
  );
};

// Header Component (Function #1)
const Header = () => {
  return <h1 className="text-3xl font-bold mb-6">NCAA Basketball Teams</h1>;
};

// Team Card Component (Function #2)
const TeamCard = ({ team }: { team: Team }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-semibold">{team.school}</h2>
      <p className="text-gray-700">Mascot: {team.name}</p>
      <p className="text-gray-500">
        Location: {team.city}, {team.state}
      </p>
    </div>
  );
};

// Team List Component (Function #3)
const TeamList = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <TeamCard key={team.tid} team={team} />
      ))}
    </div>
  );
};

export default App;
