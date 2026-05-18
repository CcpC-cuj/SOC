// // Navbar.jsx

// import { useState } from "react";

// import { Link, NavLink } from "react-router-dom";

// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   User,
//   LogIn,
//   UserPlus,
//   FolderKanban,
//   Trophy,
// } from "lucide-react";

// const navLinks = [
//   {
//     name: "Home",
//     path: "/",
//   },
//   {
//     name: "Dashboard",
//     path: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Projects",
//     path: "/projects",
//     icon: FolderKanban,
//   },
//   {
//     name: "Leaderboard",
//     path: "/leaderboard",
//     icon: Trophy,
//   },
//   {
//     name: "Profile",
//     path: "/profile",
//     icon: User,
//   },
// ];

// const Navbar = () => {
//   const [mobileMenu, setMobileMenu] = useState(false);

//   return (
//     <header className="navbar-blur sticky top-0 z-50 border-b border-white/10">

//       {/* DESKTOP NAVBAR */}
//       <div className="flex h-20 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">

//         {/* LOGO */}
//         <Link
//           to="/"
//           className="flex items-center gap-3"
//         >
//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-xl font-black shadow-lg shadow-cyan-500/20">
//             S
//           </div>

//           <div>
//             <h1 className="text-2xl font-black tracking-wide">
//               <span className="gradient-text">
//                 SoC
//               </span>
//             </h1>

//             <p className="-mt-1 text-xs text-slate-400">
//               Seasons of Code
//             </p>
//           </div>
//         </Link>

//         {/* DESKTOP NAVIGATION */}
//         <nav className="hidden items-center gap-2 lg:flex">

//           {navLinks.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
//                     isActive
//                       ? "bg-cyan-500/10 text-cyan-400"
//                       : "text-slate-300 hover:bg-white/5 hover:text-cyan-400"
//                   }`
//                 }
//               >
//                 {Icon && <Icon size={18} />}
//                 {item.name}
//               </NavLink>
//             );
//           })}

//         </nav>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-3">

//           {/* LOGIN */}
//           <Link
//             to="/login"
//             className="hidden items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400 md:flex"
//           >
//             <LogIn size={18} />
//             Login
//           </Link>

//           {/* REGISTER */}
//           <Link
//             to="/register"
//             className="gradient-button hidden items-center gap-2 md:flex"
//           >
//             <UserPlus size={18} />
//             Register
//           </Link>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="glass-card flex h-12 w-12 items-center justify-center lg:hidden"
//           >
//             {mobileMenu ? (
//               <X size={22} />
//             ) : (
//               <Menu size={22} />
//             )}
//           </button>

//         </div>

//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenu && (
//         <div className="border-t border-white/10 bg-[#050816]/95 backdrop-blur-xl lg:hidden">

//           <div className="px-4 py-6 sm:px-6 md:px-8">

//             <div className="flex flex-col gap-3">

//               {navLinks.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <NavLink
//                     key={item.name}
//                     to={item.path}
//                     onClick={() => setMobileMenu(false)}
//                     className={({ isActive }) =>
//                       `flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
//                         isActive
//                           ? "bg-cyan-500/10 text-cyan-400"
//                           : "text-slate-300 hover:bg-white/5"
//                       }`
//                     }
//                   >
//                     {Icon && <Icon size={20} />}
//                     {item.name}
//                   </NavLink>
//                 );
//               })}

//               {/* MOBILE LOGIN */}
//               <Link
//                 to="/login"
//                 className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-slate-300"
//               >
//                 <LogIn size={18} />
//                 Login
//               </Link>

//               {/* MOBILE REGISTER */}
//               <Link
//                 to="/register"
//                 className="gradient-button flex items-center justify-center gap-2"
//               >
//                 <UserPlus size={18} />
//                 Register
//               </Link>

//             </div>

//           </div>

//         </div>
//       )}

//     </header>
//   );
// };

// export default Navbar;


import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  User,
  LogIn,
  UserPlus,
  FolderKanban,
  LogOut,
  Shield,
} from "lucide-react";

const Navbar = () => {

  const navigate =
    useNavigate();

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const [user,
    setUser] =
    useState(null);

  // LOAD USER
  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(
          storedUser
        )
      );
    }

  }, []);

  // LOGOUT
  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      setUser(null);

      setMobileMenu(false);

      navigate("/");

      window.location.reload();
    };

  // NAVIGATION
  const navLinks = [

    {
      name: "Home",
      path: "/",
    },

    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },

    ...(user
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon:
              LayoutDashboard,
          },

        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">

      {/* DESKTOP */}
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-xl font-black shadow-lg shadow-cyan-500/20">

            S

          </div>

          <div>

            <h1 className="text-2xl font-black tracking-wide">

              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

                SoC

              </span>

            </h1>

            <p className="-mt-1 text-xs text-slate-400">

              Seasons of Code

            </p>

          </div>

        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-2 lg:flex">

          {
            navLinks.map(
              (item) => {

                const Icon =
                  item.icon;

                return (

                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({
                      isActive,
                    }) =>
                      `flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-slate-300 hover:bg-white/5 hover:text-cyan-400"
                      }`
                    }
                  >

                    {
                      Icon && (
                        <Icon size={18} />
                      )
                    }

                    {item.name}

                  </NavLink>
                );
              }
            )
          }

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {
            user ? (

              <>

                {/* ADMIN BADGE */}
                {
                  user.authority
                  === "admin"
                  && (

                    <div className="hidden items-center gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 md:flex">

                      <Shield size={16} />

                      Admin

                    </div>
                  )
                }

                {/* PROFILE */}
                <Link
                  to="/profile"
                  className="hidden items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400 md:flex"
                >

                  <User size={18} />

                  {
                    user.name
                      ?.split(" ")[0]
                  }

                </Link>

                {/* LOGOUT */}
                <button
                  onClick={
                    handleLogout
                  }
                  className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-3 text-sm font-semibold transition hover:scale-[1.02] md:flex"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </>
            )

            : (

              <>

                {/* LOGIN */}
                <Link
                  to="/login"
                  className="hidden items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400 md:flex"
                >

                  <LogIn size={18} />

                  Login

                </Link>

                {/* REGISTER */}
                <Link
                  to="/register"
                  className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold transition hover:scale-[1.02] md:flex"
                >

                  <UserPlus size={18} />

                  Register

                </Link>

              </>
            )
          }

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 lg:hidden"
          >

            {
              mobileMenu
                ? <X size={22} />
                : <Menu size={22} />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {
        mobileMenu && (

          <div className="border-t border-white/10 bg-[#050816]/95 backdrop-blur-xl lg:hidden">

            <div className="flex flex-col gap-3 p-6">

              {
                navLinks.map(
                  (item) => {

                    const Icon =
                      item.icon;

                    return (

                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() =>
                          setMobileMenu(
                            false
                          )
                        }
                        className={({
                          isActive,
                        }) =>
                          `flex items-center gap-3 rounded-2xl px-4 py-4 transition-all ${
                            isActive
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "text-slate-300 hover:bg-white/5"
                          }`
                        }
                      >

                        {
                          Icon && (
                            <Icon size={20} />
                          )
                        }

                        {item.name}

                      </NavLink>
                    );
                  }
                )
              }

              {
                user ? (

                  <button
                    onClick={
                      handleLogout
                    }
                    className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-4 font-semibold"
                  >

                    <LogOut size={18} />

                    Logout

                  </button>
                )

                : (

                  <>

                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-4 text-slate-300"
                    >

                      <LogIn size={18} />

                      Login

                    </Link>

                    <Link
                      to="/register"
                      onClick={() =>
                        setMobileMenu(
                          false
                        )
                      }
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-4 font-semibold"
                    >

                      <UserPlus size={18} />

                      Register

                    </Link>

                  </>
                )
              }

            </div>

          </div>
        )
      }

    </header>
  );
};

export default Navbar;