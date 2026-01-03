const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/api/auth', authRoutes);
app.use("/api/articles", require("./routes/article.routes"));
app.use("/api/users", require("./routes/user.routes"));


app.get('/', (req, res) => {
  res.send('API Dev Article Platform');
});

module.exports = app;
