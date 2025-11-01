const express = require('express');
const connectDB = require('./DB/connection');
const sessionRoute = require('./routes/sessionRoute');
const termRoute = require('./routes/termRoute');
const levelRoute = require('./routes/levelRoute');
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const klassRoute = require('./routes/KlassRoute');
const teacherRoute = require('./routes/teacherRoute');
const studentRoute = require('./routes/studentRoute');
const subjectRoute = require('./routes/subjectRoute');
const timetableRoute = require('./routes/timetableRoute');
const attendanceRoute = require('./routes/attendanceRoute');
const announcementRoute = require('./routes/announcementRoute');
const quizRoute = require('./routes/quizRoute');
const testRoute = require('./routes/testRoute');
const examRoute = require('./routes/examRoute');
const feeRoute = require('./routes/feeRoute');
const assessmentItemRoute = require('./routes/assessmentItemRoute');
const assessmentRoute = require('./routes/assessmentRoute');
const resultRoute = require('./routes/resultRoute');
const reportCardRoute = require('./routes/reportCardRoute');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');




const app = express()

// connection to mongoDB
connectDB()

//middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());

//use routes
app.use('/api/v1/session', sessionRoute);
app.use('/api/v1/term', termRoute)
app.use('/api/v1/level', levelRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/level', levelRoute)
app.use('/api/v1/profile', profileRoute)
app.use('/api/v1/klass', klassRoute)
app.use('/api/v1/teacher', teacherRoute)
app.use('/api/v1/student' , studentRoute)
app.use('/api/v1/subject' , subjectRoute)
app.use('/api/v1/timetable' , timetableRoute)
app.use('/api/v1/attendance', attendanceRoute)
app.use('/api/v1/announcement', announcementRoute)
app.use('/api/v1/quiz', quizRoute)
app.use('/api/v1/test',testRoute)
app.use('/api/v1/exam', examRoute)
app.use('/api/v1/fee', feeRoute)
app.use('/api/v1/assessmentItem', assessmentItemRoute)
app.use('/api/v1/assessment', assessmentRoute)
app.use('/api/v1/result', resultRoute)
app.use('/api/v1/reportcard', reportCardRoute)
app.use('/api/v1/auth', authRoute)


app.get('/', (req, res) =>{
    res.send('Hello, World')
})

app.get('/about', (req, res) => {
    res.send('About page is for the purpose of the web app ')
})

//Listen on port 3001

app.listen(3001, () => {
    console.log('server running at http://localhost:3001/')
})