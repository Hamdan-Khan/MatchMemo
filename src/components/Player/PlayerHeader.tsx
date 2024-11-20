import { Player } from "@/types/player";

export default function PlayerHeader({ player }: { player: Player }) {
  const age =
    new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear();

  return (
    <div className="bg-secondary rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h1 className="text-3xl font-bold text-white">{player.name}</h1>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
            <p>Position: {player.position}</p>
            <p>Age: {age} years</p>
            <p>Nationality: {player.nationality}</p>
            <p>Number: {player.shirtNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
