import { players, teams } from "./constants";
import axios from "axios";

export type SkatersType = {
  goals: number;
  assists: number;
  firstName: string;
  lastName: string;
};

export type GoaliesType = {
  shutouts: number;
  wins: number;
  firstName: string;
  lastName: string;
};
export type ErrorMessage = string | null;
type PointsSumType = number;

export async function fetchPlayers() {
  let skaters: SkatersType[] | null = null;
  let goalies: GoaliesType[] | null = null;
  let error: ErrorMessage = null;
  let pointsSum: PointsSumType = 0;

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

    //  Points earned:
    // Goal        - 1 pt
    // Assist       - 1 pt
    // Goalie win   - 1 pt
    //       or
    // Shutout     - 2 pts
    skaters?.forEach(({ goals, assists }) => {
      pointsSum += goals + assists;
    });
    goalies?.forEach(({ wins, shutouts }) => {
      pointsSum += wins + shutouts * 2;
    });

    return { skaters, goalies, error, pointsSum };
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
      return { skaters, goalies, error, pointsSum };
    }
  }
}
