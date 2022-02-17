// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const TemplateAPI = require("./routes/TemplateAPI");
const PlaygroundAPI = require("./routes/PlaygroundAPI");
const LanguageAPI = require("./routes/LanguageAPI");
const PreviewAPI = require("./routes/PreviewAPI");
const CreativesAPI = require("./routes/CreativesAPI");

// Step 2
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));

//APIs
app.use("/TemplateAPI", TemplateAPI);
app.use("/PlaygroundAPI", PlaygroundAPI);
app.use("/LanguageAPI", LanguageAPI);
app.use("/PreviewAPI", PreviewAPI);
app.use("/CreativesAPI", CreativesAPI);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
