import { Router } from "express"
import Memcached from "memcached"

const DB_HOST = 'localhost'
const DB_PORT = 5652

const memcached = new Memcached(`${DB_HOST}:${DB_PORT}`)

const router = Router()

router.get('/message', function(_, res) {
  console.log("on message")
  memcached.get('message', (err, data) => {
    console.log("get!!!")
    console.log(err, data)
    if (err) {
      res.status(400).send(err)
    }
    else {
      console.log(data)
      res.send(data);
    }
  })
});

router.post('/message', function(req, res) {
  const sender = req.header('uniqys-sender')
  console.log(`sender ${sender}`)
  console.log(req.body)
  const message = req.body['message']

  memcached.set('message', message, 0, (err, result) => {
    console.log(err, result)
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.sendStatus(200)
    }
  })
})

export = router