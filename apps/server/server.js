// // src/server.js

// import express from "express";

// import cors from "cors";

// import dotenv from "dotenv";

// import connectDB from "./src/config/db.js";
// import authRoutes from "./src/routes/authRoutes.js";

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(
//   "/api/auth",
//   authRoutes
// );

// const PORT =
//   process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(
//     `Server running on port ${PORT}`
//   );
// });


// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import teamRoutes from "./src/routes/teamRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import projectMemberRoutes from "./src/routes/projectMemberRoutes.js";
import projectSubmissionRoutes from "./src/routes/projectSubmissionRoutes.js";

dotenv.config();

connectDB();

const app =
  express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/project-members",
  projectMemberRoutes
);

app.use(
  "/api/teams",
  teamRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/project-submissions",
  projectSubmissionRoutes
);

const PORT =
  process.env.PORT
  || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);