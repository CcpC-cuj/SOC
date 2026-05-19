// 
import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import {
  Trash2,
  Mail,
  ShieldCheck,
} from "lucide-react";

const Users = () => {

  const [users,
    setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  // FETCH USERS
const fetchUsers =
  async () => {

    try {

      const response =
        await API.get(
          "/users"
        );

      setUsers(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};

  // DELETE USER
const deleteUser =
  async (id) => {

    try {

      await API.delete(
        `/users/${id}`
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
};

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-black">

          User Management

        </h1>

        <p className="mt-3 text-slate-400">

          Manage platform users

        </p>

      </div>

      {/* USER GRID */}
      <div className="grid gap-6 lg:grid-cols-2">

        {users.map((user) => (

          <div
            key={user._id}
            className="rounded-3xl border border-white/10 bg-white/5 p-7"
          >

            {/* TOP */}
            <div className="mb-6 flex items-start justify-between">

              <div>

                <h2 className="text-3xl font-black">

                  {user.name}

                </h2>

                <div className="mt-3 flex items-center gap-3 text-slate-400">

                  <Mail
                    size={18}
                  />

                  {user.email}

                </div>

              </div>

              <button
                onClick={() =>
                  deleteUser(
                    user._id
                  )
                }
                className="rounded-2xl bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
              >

                <Trash2
                  size={20}
                />

              </button>

            </div>

            {/* INFO */}
            <div className="space-y-4">

              <div className="flex flex-wrap gap-3">

                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

                  {user.department}

                </span>

                <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">

                  Roll:
                  {" "}
                  {user.roll}

                </span>

              </div>

              {/* AUTHORITY */}
              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={18}
                  className="text-yellow-400"
                />

                <span className="text-slate-300">

                  Authority:
                  {" "}

                  <span className="font-bold text-yellow-300">

                    {
                      user.authority
                    }

                  </span>

                </span>

              </div>

              {/* SKILLS */}
              <div className="flex flex-wrap gap-3">

                {
                  user.skills?.map(
                    (skill) => (

                      <span
                        key={skill}
                        className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300"
                      >

                        {skill}

                      </span>
                    )
                  )
                }

              </div>
              
              {/* JOINED PROJECTS */}
              <div className="mt-5">

                <h3 className="mb-3 text-lg font-bold">

                  Joined Projects

                </h3>

                <div className="flex flex-wrap gap-3">

                  {
                    user.memberships?.length
                    > 0 ? (

                      user.memberships.map(
                        (member) => (

                          <span
                            key={member._id}
                            className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300"
                          >

                            {
                              member.project
                                ?.title
                            }

                          </span>
                        )
                      )

                    ) : (

                      <span className="text-slate-500">

                        No projects joined

                      </span>
                    )
                  }

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Users;