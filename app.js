// 모듈
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({
    origin: 'http://youngbinweb.com',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

// 라우팅
const userRouter = require("./routes/user")
app.use("/user", userRouter);

// 앱세팅
app.get('/', (req, res) => {
  res.send('hello mainpage');
});

app.listen(PORT, function () {
  console.log(`:::::::: Listening on port ${PORT} ::::::::`);
});
