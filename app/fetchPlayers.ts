import { teams } from "./constants";

export async function fetchPlayers() {
  try {
    const response = await Promise.all(
      teams.map((team) =>
        fetch(`https://api-web.nhle.com/v1/club-stats/${team}/20242025/3`, {
          cache: "no-store",
        })
      )
    );
    const skatersData: any = [];
    const goaliesData: any = [];
    for (const res of response) {
      const data = await res.json();
      skatersData.push(...data.skaters);
      goaliesData.push(...data.goalies);
    }

    return { skatersData, goaliesData };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
