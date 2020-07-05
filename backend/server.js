require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

// Bring in the models
require("./models/User");
require("./models/chatroom");
require("./models/message");

const app = require("./app");

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

const io = require('socket.io')(server);

const jwt = require("jwt-then");

io.use(async (socket,next)=>{

try {
  const token = socket.handshake.query.token
  const payload = await jwt.verify(token, process.env.SECRET);
  socket.userId=payload.id
  next();
} catch (err) {
  res.status(401).json({
    message: "Forbidden ",
  });
}
})

io.on('connection',(socket)=>{
  console.log('connected'+ socket.userId)

  socket.on('disconnect',()=>{
    console.log("Disconneted:" + socket.userId)
  })
})
