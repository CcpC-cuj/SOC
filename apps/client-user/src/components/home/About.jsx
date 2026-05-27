const cards = [
  {
    title: "Register With Clarity",
    body:
      "Participants submit a capability-focused profile instead of rushing into a random project.",
    tone:
      "text-cyan-300 border-cyan-400/20 hover:border-cyan-400/30",
  },
  {
    title: "Review With Intent",
    body:
      "Admins compare skill depth, interest, and availability before balancing squads.",
    tone:
      "text-fuchsia-300 border-fuchsia-400/20 hover:border-fuchsia-400/30",
  },
  {
    title: "Build In The Right Team",
    body:
      "Members are placed where they can contribute meaningfully and grow with confidence.",
    tone:
      "text-emerald-300 border-emerald-400/20 hover:border-emerald-400/30",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-28"
    >
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-black md:text-5xl">
          What makes this SoC workflow different?
        </h2>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
          We are designing the experience to be fair for organizers and motivating for participants. Instead of self-joining into teams blindly, members are placed after the registration review.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-3xl border bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:bg-white/10 ${card.tone}`}
          >
            <h3 className="mb-4 text-2xl font-bold">
              {card.title}
            </h3>

            <p className="leading-8 text-slate-300">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
