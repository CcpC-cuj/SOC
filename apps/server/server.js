// // // src/server.js

// // import express from "express";

// // import cors from "cors";

// // import dotenv from "dotenv";

// // import connectDB from "./src/config/db.js";
// // import authRoutes from "./src/routes/authRoutes.js";

// // dotenv.config();

// // connectDB();

// // const app = express();

// // app.use(cors());

// // app.use(express.json());

// // app.use(
// //   "/api/auth",
// //   authRoutes
// // );

// // const PORT =
// //   process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(
// //     `Server running on port ${PORT}`
// //   );
// // });


// // server.js

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./src/config/db.js";
// import authRoutes from "./src/routes/authRoutes.js";
// import projectRoutes from "./src/routes/projectRoutes.js";
// import userRoutes from "./src/routes/userRoutes.js";
// import teamRoutes from "./src/routes/teamRoutes.js";
// import dashboardRoutes from "./src/routes/dashboardRoutes.js";
// import taskRoutes from "./src/routes/taskRoutes.js";
// import projectMemberRoutes from "./src/routes/projectMemberRoutes.js";
// import projectSubmissionRoutes from "./src/routes/projectSubmissionRoutes.js";

// dotenv.config();

// connectDB();

// const app =
//   express();

// app.use(cors());

// app.use(express.json());

// app.use(
//   "/api/auth",
//   authRoutes
// );

// app.use(
//   "/api/dashboard",
//   dashboardRoutes
// );

// app.use(
//   "/api/projects",
//   projectRoutes
// );

// app.use(
//   "/api/project-members",
//   projectMemberRoutes
// );

// app.use(
//   "/api/teams",
//   teamRoutes
// );

// app.use(
//   "/api/tasks",
//   taskRoutes
// );

// app.use(
//   "/api/users",
//   userRoutes
// );

// app.use(
//   "/api/project-submissions",
//   projectSubmissionRoutes
// );

// const PORT =
//   process.env.PORT
//   || 5000;

// app.listen(
//   PORT,
//   () => {

//     console.log(
//       `Server running on port ${PORT}`
//     );

//   }
// );

// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import teamRoutes from "./src/routes/teamRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import projectMemberRoutes from "./src/routes/projectMemberRoutes.js";
import projectSubmissionRoutes from "./src/routes/projectSubmissionRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";

dotenv.config();

// CONNECT DATABASE
connectDB();

const app = express();

const configuredOrigins = [
  process.env.USER_CLIENT_URL,
  process.env.PUBLIC_CLIENT_URL,
].filter(Boolean);

const localDevOriginPattern =
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const localDevHostPattern =
  /^(localhost|127\.0\.0\.1)(:\d+)?$/;

const localAddressPattern =
  /(::1|127\.0\.0\.1)$/;

const corsOptions = {
  origin: function (
    origin,
    callback
  ) {
    if (!origin) {
      return callback(
        null,
        true
      );
    }

    if (
      localDevOriginPattern.test(
        origin
      ) ||
      configuredOrigins.includes(
        origin
      )
    ) {
      return callback(
        null,
        true
      );
    }

    return callback(
      new Error(
        `Not allowed by CORS: ${origin}`
      )
    );
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,
};

const isLocalDevelopmentRequest =
  (req) => {
    if (
      process.env.NODE_ENV ===
      "production"
    ) {
      return false;
    }

    const origin =
      req.get("origin") || "";
    const host = req.get("host") || "";
    const requestIp =
      req.ip || "";
    const remoteAddress =
      req.socket?.remoteAddress ||
      "";

    return (
      localDevOriginPattern.test(
        origin
      ) ||
      localDevHostPattern.test(
        host
      ) ||
      localAddressPattern.test(
        requestIp
      ) ||
      localAddressPattern.test(
        remoteAddress
      )
    );
  };


// SECURITY MIDDLEWARE
app.use(helmet());


// REQUEST LOGGER
app.use(morgan("dev"));


app.use(
  cors(corsOptions)
);

app.options(
  /.*/,
  cors(corsOptions)
);


// RATE LIMITER
const limiter = rateLimit({
  windowMs:
    15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  skip: (req) =>
    req.method === "OPTIONS" ||
    isLocalDevelopmentRequest(req),

  message: {
    success: false,
    message:
      "Too many requests. Try again later.",
  },
});

app.use(limiter);


// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       process.env.USER_CLIENT_URL,
//     ],

//     credentials: true,
//   })
// );



// BODY PARSER
app.use(express.json());


// HEALTH CHECK
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message:
      "SOC API running successfully",
  });

});


// ROUTES
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

app.use(
  "/api/settings",
  settingsRoutes
);


// 404 HANDLER
app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found",
  });

});


// GLOBAL ERROR HANDLER
app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(err);

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
    });
  }
);


const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);
