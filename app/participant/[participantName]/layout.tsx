export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex flex-col gap-[16px] items-center sm:items-start mt-4">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-[-.01em] text-center">
        NHL Playoffs Pool
      </h1>
      <p>
        Points and table will automatically update after every playoff game.
      </p>
      {children}
    </main>
  );
}
