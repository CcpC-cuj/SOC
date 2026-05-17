// WelcomeBanner.jsx

const WelcomeBanner = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8">

      <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10">

        <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          🚀 Seasons of Code Workspace
        </div>

        <h1 className="text-5xl font-black leading-tight">
          Welcome Back,
          <br />

          {user?.name}
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          Continue building innovative projects, collaborating with your teams,
          and completing tasks assigned by your leaders.
        </p>

      </div>

    </section>
  );
};

export default WelcomeBanner;