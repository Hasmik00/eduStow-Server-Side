import express from "express";

import userRoutes from "./routes/user.route.js";
import connect from "./connection.js";
import categoryRoute from "./routes/category.route.js";
import subcategoryRoute from "./routes/subcategory.route.js";
import courseRoute from "./routes/course.route.js";

const app = express();

connect.connect;
app.use(express.json());

app.use(userRoutes);
app.use("/category", categoryRoute);
app.use("/subcategory", subcategoryRoute);
app.use("/course", courseRoute);

// if (config.isValid()) {
//   process.exit(0);
// }

app.listen(process.env.PORT);
