import { Coach } from "@/types";

export default function CoachSection({ coach }: { coach: Coach }) {
  return (
    <div className="bg-secondary rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Coach</h2>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium text-white">{coach.name}</p>
        <div className="text-sm text-gray-300">
          <p>Nationality: {coach.nationality}</p>
          <p>
            Date of Birth: {new Date(coach.dateOfBirth).toLocaleDateString()}
          </p>
          {coach.contract && (
            <p>
              Contract: {coach.contract.start} - {coach.contract.until}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
