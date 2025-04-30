export type ParticipantNameType = "juan" | "christyn";

export const participantNames: Array<ParticipantNameType> = [
  "juan",
  "christyn",
];

export const players: Record<ParticipantNameType, string[]> = {
  juan: [
    "Auston Matthews",
    "Nikita Kucherov",
    "Matthew Tkachuk",
    "Brandon Hagel",
    "Sam Reinhart",
    "Sebastian Aho",
    "Brayden Point",
    "Brady Tkachuk",
    "Victor Hedman",
    "Brent Burns",
    "Seth Jones",
    "Morgan Rielly",
    "Thomas Chabot",
    "Jakob Chychrun",
    "Andrei Vasilevskiy", // Goalie
    "Sergei Bobrovsky", // Goalie
  ],
  christyn: [
    "Sam Reinhart",
    "Nikita Kucherov",
    "Brandon Hagel",
    "Drake Batherson",
    "Alex Ovechkin",
    "Sebastian Aho",
    "Seth Jarvis",
    "Nick Suzuki",
    "Victor Hedman",
    "Darren Raddysh",
    "Shayne Gostisbehere",
    "Brent Burns",
    "Jake Sanderson",
    "John Carlson",
    "Andrei Vasilevskiy", // Goalie
    "Pyotr Kochetkov", // Goalie
  ],
};

export const teams: string[] = [
  "TOR",
  "TBL",
  "FLA",
  "WSH",
  "CAR",
  "NJD",
  "OTT",
  "MTL",
];
