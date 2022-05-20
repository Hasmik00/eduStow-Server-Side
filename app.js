import express from "express";

import userRoutes from "./routes/user.route.js";
import connect from "./connection.js";
import categoryRoute from "./routes/category.route.js";
import subcategoryRoute from "./routes/subcategory.route.js";
import courseRoute from "./routes/course.route.js";
import ConfigService from "./config/config.service.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();
connect.connect;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", userRoutes);
app.use("/category", categoryRoute);
app.use("/subcategory", subcategoryRoute);
app.use("/course", courseRoute);

if (ConfigService.isValid()) {
  process.exit(0);
}

app.use(errorHandler);

app.listen(process.env.PORT);
