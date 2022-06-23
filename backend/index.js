const cors = require("cors");
const bp = require("body-parser");
const exp = require("express");
const {success,error} = require('consola');
const mongoose = require("mongoose");

const passport= require("passport");
const app  = exp();
const expressValidator = require('express-validator')
const socket = require("socket.io");

//views

app.use(bp.urlencoded({ extended: false }));

app.use(expressValidator())
    

// parse application/json
app.use(bp.json());
app.get('/', (req, res) => {
    res.render('home');
});
//Bring in the app constants
const {DB, PORT}= require("./config");

//Initialize the application 
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());
require('./middlewares/passport')(passport);



//User Router Middleware
app.use("/api/users",require("./routes/users"));
app.use("/api/posts",require("./routes/posts"));
app.use("/api/offres",require("./routes/joboffres"));
app.use("/api/messages",require("./routes/messages"));

const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`)
);


const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
   
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });





