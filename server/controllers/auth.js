const bcrypt = require('bcrypt')

const users = []

module.exports = {
    // login: (req, res) => {
    //   console.log('Logging In User')
    //   console.log(req.body)
    //   const { username, password } = req.body
      
    //   for (let i = 0; i < users.length; i++) {
    //     if (users[i].username === username && users[i].password === password) {
    //       res.status(200).send(users[i])
    //     }
    //   }
    //   res.status(400).send("User not found.")
    // },
    
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const {email, password, username, firstName, lastName} = req.body
      
      
      let userData
  
      //look for a user with the username passed in
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          userData = users[i]
        }
      }
  
      if (userData === undefined) {
        res.status(200).send({success: false, message: 'bad username'})
      } else {
        bcrypt.compare(password, userData.password, (error, success) => {
          if (!error) {
            if (success) {
              res.status(200).send({success: true, username: username, email: email, firstName: firstName, lastName: lastName})
            } else {
              res.status(200).send({success: false, message: 'bad password'})
            }
          } else {
            console.log('bcrypt had an error comparing passwords: ')
            console.log(error)
            res.status(500).send({success: false, message: "backend error"})
          }
        })
  
  
      }
    },


    
    register: (req, res) => {
        console.log('Registering User')
        // console.log(req.body)
        users.push(req.body)
        let userPass = req.body.password
        let saltRounds = 10

        bcrypt.hash(userPass, saltRounds, (err, hashPass) => {
          let updateDataBase = {}
          updateDataBase = req.body
          updateDataBase.password = hashPass
          users.push(updateDataBase)
          console.log(users)
        })

        res.status(200).send(req.body)
    }
}