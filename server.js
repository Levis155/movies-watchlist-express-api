import app from "./index.js";

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App running on port 3000");
});
