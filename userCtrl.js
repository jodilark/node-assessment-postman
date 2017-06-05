const users = require('./userData')

exports.getUsers = function (req, res) {
    var obj = req.query
    var type = Object.keys(obj).join()

    var matches = []
    switch (type) {
        case "favorites":
            matches = users.filter(function (e, i, arr) {
                let user = users[i]
                for (let key in obj) {
                    let exists = user[key].indexOf(obj[key])
                    if (exists === -1) {
                        return false
                    }
                } return true
            })
            break;
        case "age":
            matches = users.filter(function (e, i, arr) {
                let user = users[i]
                return user[type] < obj[type]
            })
            break;
        case "lastname":
            matches = users.filter(function (e, i, arr) {
                let user = users[i]
                let nType = type.substring(0, 4) + "_" + type.substr(4)
                // console.log(nType)
                // console.log(obj)
                // console.log(obj[nType])
                return user[nType] === obj[type]
            })
            // console.log(matches)
            break;
        case "email":
            var eMatches = users.filter(function (e, i, arr) {
                let user = users[i]
                return user[type] === obj[type]
            })
            matches = eMatches[0]
            break;
        default:
            matches = users
    }

    res.status(200).send(matches)
}

exports.getUserById = function (req, res) {
    let uID = req.params.id
    var found = 0
    let bMatches = users.filter(function (e, i, arr) {
        if (users[i].id == uID) {
            found++
            return true
        }

    })
    matches = bMatches[0]
    if (found === 0) {
        // console.log('not found')
        return res.status(404).json(null)
    }
    else {
        // console.log('found')
        // console.log(matches)
        res.status(200).send(matches)
    }
}

exports.getAdmins = function (req, res) {
    matches = users.filter(function (e, i, arr) {
        if (users[i].type === 'admin') {
            return true
        }
    })
    res.status(200).send(matches)
}

exports.getNonAdmins = function (req, res) {
    matches = users.filter(function (e, i, arr) {
        if (users[i].type != 'admin') {
            return true
        }
    })
    res.status(200).send(matches)
}

exports.getUserType = function (req, res) {
    let uType = req.params.userType
    matches = users.filter(function (e, i, arr) {
        if (users[i].type === uType) {
            return true
        }
    })
    res.status(200).send(matches)
}

exports.updateUser = function (req, res) {
    let uId = req.params.id
    let update = req.body
    // console.log(rBody)
    for(let i = 0; i < users.length; i ++){
        if(users[i].id == uId){
            // console.log(`found it!`)
            users.splice(i, 1, update)
        }
    }
    // console.log(users)
    res.status(200).send(users)
}

exports.newUser = function(req, res){
    let uInfo = req.body
    let lastUser = users.length
    lastUser++
    // console.log(lastUser)
    uInfo.id = lastUser
    users.push(uInfo)
    res.status(200).send(users)
}

exports.deleteUser = function (req, res){
    let dUser = req.params.id
    for(let i = 0; i < users.length; i++){
        if(users[i].id == dUser){
            users.splice(i,1)
        }
    }
    res.status(200).send(users)
}