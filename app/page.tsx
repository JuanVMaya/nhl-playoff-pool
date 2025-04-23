import axios from "axios";
import { players } from "./constants";
import { useFetchPlayers } from "./fetchPlayers";

export default async function Home() {
  const fetchResult = await useFetchPlayers();
  const { skaters, goalies, error, pointsSum } = fetchResult || {
    skaters: null,
    goalies: null,
    error: null,
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[-.01em] text-center">
          NHL Playoffs Pool
        </h1>
        <table className="w-full text-sm/6 sm:text-left">
          <thead>
            <th className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Name
              </h2>
            </th>
            <th className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Goals
              </h2>
            </th>
            <th className="justify-center p-2 border border-gray-300">
              <h2 className="text-xl font-bold tracking-[-.01em] text-center">
                Assists
              </h2>
            </th>
          </thead>
          <tbody>
            {skaters &&
              skaters.map(({ goals, assists, firstName, lastName }: any) => (
                <tr key={`${firstName} ${lastName}`}>
                  <td className="justify-center p-2 border border-gray-300">
                    <p className="text-md tracking-[-.01em] text-center">
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
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
