const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log('Server up & listening on ' + PORT)
})

app.get('/api/users', (req, res, next) => {
    db.user.findAll().then(users => {
        res.json(users)
    })

})

//curl http://localhost:3002/api/tweets/1

app.get('/api/tweets/:userId', (req, res) => {
    db.user.findByPk(req.params.userId).then(user => {
        if (user) {
            user.getTweets().then(tweets => {
                res.json(tweets);
            })
        }
    })
})

//curl -d '{"userName":"bobbyT", "email":"bobbytables@gmail.com", "password":"1234"}' -H "Content-Type: application/json" -X POST http://localhost:3002/api/user

app.post('/api/user', (req, res) => {
    const user = req.body
    db.user.create(user).then(newDbUser => {
        if (newDbUser) {
            res.json(newDbUser)
        }
    }).catch(e => {
        res.status(500).send(`Couldn't create user`)
    })
})

//curl -d '{"message":"Hello from the universe", "userId": "1"}' -H "Content-Type: application/json" -X POST http://localhost:3002/api/tweet
app.post('/api/tweet', (req, res, next) => {
    const tweet = req.body
    db.tweet.create(tweet).then(newDBTweet => {
        if (newDBTweet) {
            res.json(newDBTweet);
        }
    })
})




