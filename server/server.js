const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Landing page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Server</title>
        <style>
          body{
            font-family: Arial;
            background:#0f172a;
            color:white;
            text-align:center;
            padding-top:80px;
          }
          .box{
            max-width:600px;
            margin:auto;
            background:#1e293b;
            padding:30px;
            border-radius:10px;
          }
          a{
            color:#38bdf8;
            display:block;
            margin:10px;
            text-decoration:none;
          }
        </style>
      </head>

      <body>
        <div class="box">
          <h1>🚀 My API Server</h1>
          <p>Server running successfully</p>

          <h3>Available Endpoints</h3>

          <a href="/api/status">GET /api/status</a>
          <a href="/api/users">GET /api/users</a>
        </div>
      </body>
    </html>
  `);
});

// Example APIs
app.get("/api/status", (req, res) => {
  res.json({ status: "OK", server: "running" });
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Vishnu" },
    { id: 2, name: "User2" }
  ]);
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});