import { ParticipantNameType } from "@/app/constants";
import { fetchPlayers } from "@/app/fetchPlayers";
import {
  filterPlayers,
  GoaliesType,
  SkatersType,
} from "@/app/lib/filterPlayers";

export default async function Participant({
  params,
}: {
  params: Promise<{ participantName: ParticipantNameType }>;
}) {
  const { participantName } = await params;
  const { skatersData, goaliesData } = (await fetchPlayers()) || {
    skatersData: {},
    goaliesData: {},
  };
  const filteredPlayers = filterPlayers({
    skatersData,
    goaliesData,
    poolParticipant: participantName,
  });

  const { skaters, goalies, pointsSum } = filteredPlayers || {};

  if (!skaters || !goalies) {
    return <h1>There was an error processing the request</h1>;
  }
  return (
    <>
      <h1 className="font-bold text-xl"> Total Points: {pointsSum}</h1>
      <table className="w-full text-sm/6 sm:text-left">
        <thead>
          <tr>
            <td className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Name
              </h2>
            </td>
            <td className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Goals
              </h2>
            </td>
            <td className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Assists
              </h2>
            </td>
            <td className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Shutouts
              </h2>
            </td>
            <td className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Wins
              </h2>
            </td>
          </tr>
        </thead>
        <tbody>
          {skaters &&
            skaters.map(
              ({ goals, assists, firstName, lastName }: SkatersType) => (
                <tr key={`${firstName} ${lastName}`}>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center font-bold">
                      {firstName} {lastName}
                    </p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">
                      {goals}
                    </p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">
                      {assists}
                    </p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">-</p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">-</p>
                  </td>
                </tr>
              )
            )}
          {goalies &&
            goalies.map(
              ({ firstName, lastName, shutouts, wins }: GoaliesType) => (
                <tr key={`${firstName} ${lastName}`}>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center font-bold">
                      {firstName} {lastName}
                    </p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">-</p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">-</p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">
                      {shutouts}
                    </p>
                  </td>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">
                      {wins}
                    </p>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  );
}
