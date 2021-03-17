require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))

const URI = process.env.MONGO_DB_URL

const connectDB = async () => {
	await mongoose.connect(
		URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true,
		},
		(error) => {
			if (error) throw error
			console.log('Connected to mongoDB')
		}
	)
}

connectDB()

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log('Server is running on port ', port)
})
