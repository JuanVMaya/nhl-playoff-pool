export default function Home() {
  return (
    <main className="mx-auto flex flex-col gap-[16px] items-center sm:items-start mt-4">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-[-.01em] text-center">
        NHL Playoffs Pool
      </h1>
      <p>
        Points and table will automatically update after every playoff game.
      </p>
      <h2 className="text-xl font-bold tracking-[-.01em] text-center">
        Select a participant from the column on the left!
      </h2>
    </main>
  );
}
