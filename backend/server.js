require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()
const cors = require('cors');

// Allowed origins ka array
const allowedOrigins = [
  'http://localhost:3000', // Local development frontend
  'https://mern-stack--xi.vercel.app', // Deployed frontend (replace with your actual frontend URL)
];

// CORS middleware setup
app.use(cors({
  origin: (origin, callback) => {
    // Agar origin allowed hai ya undefined (e.g., Postman requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // If you are using cookies/auth headers
}));





// middleware
app.use(express.json())


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.get("/",(req,res)=>{
  res.json({message:"hi"})
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })