import { useEffect } from "react";

import { useNavigate }
from "react-router-dom";

const Dashboard = () => {

  const navigate =
    useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      navigate("/login");
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  return (
    <div className="min-h-screen bg-[#050816] p-10 text-white">

      <h1 className="text-5xl font-black">
        Welcome,
        {" "}
        {user?.name}
      </h1>

      <p className="mt-4 text-slate-400">
        Role:
        {" "}
        {user?.role}
      </p>

      <button
        onClick={handleLogout}
        className="mt-10 rounded-2xl bg-red-500 px-6 py-3 font-bold"
      >
        Logout
      </button>

    </div>
  );
};

export default Dashboard;