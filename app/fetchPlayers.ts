import { players, teams } from "./constants";
import axios from "axios";

export async function useFetchPlayers() {
  let skaters = null;
  let goalies = null;
  let error = null;

  try {
    const response = await Promise.all(
      teams.map((team) =>
        axios.get(`https://api-web.nhle.com/v1/club-stats/${team}/20242025/3`)
      )
    );
    const skatersData: any = [];
    const goaliesData: any = [];
    response.forEach(({ data }) => {
      skatersData.push(...data.skaters);
      goaliesData.push(...data.goalies);
    });

    skaters = skatersData
      .filter(
        ({
          firstName,
          lastName,
        }: {
          firstName: { default: string };
          lastName: { default: string };
        }) => players.includes(`${firstName.default} ${lastName.default}`)
      )
      .map(
        ({
          goals,
          assists,
          firstName,
          lastName,
        }: {
          goals: number;
          assists: number;
          firstName: { default: string };
          lastName: { default: string };
        }) => ({
          goals,
          assists,
          firstName: firstName.default,
          lastName: lastName.default,
        })
      );

    goalies = goaliesData
      .filter(
        ({
          firstName,
          lastName,
        }: {
          firstName: { default: string };
          lastName: { default: string };
        }) => players.includes(`${firstName.default} ${lastName.default}`)
      )
      .map(
        ({
          shutouts,
          wins,
          firstName,
          lastName,
        }: {
          shutouts: number;
          wins: number;
          firstName: { default: string };
          lastName: { default: string };
        }) => ({
          shutouts,
          wins,
          firstName: firstName.default,
          lastName: lastName.default,
        })
      );

    console.log(skaters);
    console.log(goalies);
    console.log("This is data:", skatersData);

    const pointsSum = 0; // Todo

    return { skaters, goalies, error, pointsSum };
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    }
  }
}
