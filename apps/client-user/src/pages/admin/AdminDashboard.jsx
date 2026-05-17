// client-admin/src/pages/Dashboard.jsx

const Dashboard = () => {

  return (
    <div>

      <h1 className="mb-10 text-5xl font-black">

        Admin Dashboard

      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">
            24
          </h2>

          <p className="mt-2 text-slate-400">
            Total Projects
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">
            240
          </h2>

          <p className="mt-2 text-slate-400">
            Total Users
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">
            85
          </h2>

          <p className="mt-2 text-slate-400">
            Active Tasks
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">
            12
          </h2>

          <p className="mt-2 text-slate-400">
            Team Leaders
          </p>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;