import { ParticipantNameType, players } from "../constants";

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

export const filterPlayers = ({
  skatersData,
  goaliesData,
  poolParticipant,
}: {
  skatersData: any;
  goaliesData: any;
  poolParticipant: ParticipantNameType;
}) => {
  let skaters: SkatersType[] | null = null;
  let goalies: GoaliesType[] | null = null;
  let pointsSum: PointsSumType = 0;

  skaters = skatersData
    .filter(
      ({
        firstName,
        lastName,
      }: {
        firstName: { default: string };
        lastName: { default: string };
      }) =>
        players[poolParticipant].includes(
          `${firstName.default} ${lastName.default}`
        )
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
      }) =>
        players[poolParticipant].includes(
          `${firstName.default} ${lastName.default}`
        )
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

  // Calculate points sum
  skaters?.forEach(({ goals, assists }) => {
    pointsSum += goals + assists;
  });
  goalies?.forEach(({ wins, shutouts }) => {
    pointsSum += wins + shutouts * 2;
  });

  return { skaters, goalies, pointsSum };
};
