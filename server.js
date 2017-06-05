const express = require('express')
const bodyParser = require('body-parser')
const userCtrl = require('./userCtrl')
const port = 3000
const app = express()
app.use(bodyParser.json())

app.get('/api/users', userCtrl.getUsers)
app.get('/api/users/:id', userCtrl.getUserById)
app.get('/api/admins', userCtrl.getAdmins)
app.get('/api/nonadmins', userCtrl.getNonAdmins)
app.get('/api/user_type/:userType', userCtrl.getUserType)
app.put('/api/users/:id', userCtrl.updateUser)
app.post('/api/users', userCtrl.newUser)
app.delete('/api/users/:id', userCtrl.deleteUser)

app.listen(port, function (req, res){
    console.log(`listening on port ${port}`)
})