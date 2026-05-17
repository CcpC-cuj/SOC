// TeamSection.jsx

const teams = [
  "Frontend Team",
  "Backend Team",
  "AI/ML Team",
];

const TeamSection = () => {
  return (
    <section className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

      <h2 className="mb-8 text-3xl font-black">
        Your Teams
      </h2>

      <div className="space-y-5">

        {teams.map((team) => (
          <div
            key={team}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >

            <h3 className="text-xl font-bold">
              {team}
            </h3>

          </div>
        ))}

      </div>

    </section>
  );
};

export default TeamSection;