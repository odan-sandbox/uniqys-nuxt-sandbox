import { Router } from "express"
import Memcached from "memcached"

const DB_HOST = 'localhost'
const DB_PORT = 5652

const memcached = new Memcached(`${DB_HOST}:${DB_PORT}`)

const router = Router()

router.get('/message', function(_, res) {
  memcached.get('message', (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    else {
      console.log(data)
      res.send({ message: data });
    }
  })
});

router.post('/message', function(req, res) {
  const sender = req.header('uniqys-sender')
  console.log(`sender ${sender}`)
  const message = req.body['message']

  memcached.set('message', message, 0, (err) => {
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.sendStatus(200)
    }
  })
})

export = router