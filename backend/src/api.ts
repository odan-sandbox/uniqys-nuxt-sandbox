import { Router } from "express"
import Memcached from "memcached"

const DB_HOST = 'localhost'
const DB_PORT = 5652

const memcached = new Memcached(`${DB_HOST}:${DB_PORT}`)

const router = Router()

interface Message {
  index: number;
  text: string;
  user: string;
}

class Counter {
  constructor(
    private memcached: Memcached,
    private key: string
  ) {

  }

  public get(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.memcached.get(this.key, (err, data) => {
        if (err) {
          reject(err)
          return
        }

        if (data) {
          resolve(data)
        }
        else {
          resolve(0)
        }
      })
    })
  }

  public incr(): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      const count = await this.get()
      if (count === 0) {
        this.memcached.set(this.key, 1, 0, (err, result) => {
          if (err) {
            reject(err)
            return
          }
          if (result) {
            resolve(count + 1)
          }
          else {
            resolve(count)
          }
        })
      }
      else {
        this.memcached.incr(this.key, 1, (err, result) => {
          if (err) {
            reject(err)
            return
          }
          if (result) {
            resolve(count + 1)
          }
          else {
            resolve(count)
          }
        })
      }
    })
  }
}

const countKey = 'MESSAGE_COUNT'
const counter = new Counter(memcached, countKey)

router.get('/message/count', async function(_, res) {
  const count = await counter.get()
  res.send({ count })
})

router.get('/messages/:id', function(req, res) {
  const { id } = req.params
  if (!id) {
    res.status(400).send('Please id')
  }
  memcached.get(`message:${id}`, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    else if (data) {
      res.send(data);
    }
    else {
      res.status(404).send()
    }
  })
});

router.post('/message', async function(req, res) {
  const sender = req.header('uniqys-sender')
  if (sender == null) {
    res.status(400).send("Please via chain")
    return
  }
  const index = await counter.incr()
  const message: Message = {
    text: req.body['message'],
    user: sender,
    index,
  }

  memcached.set(`message:${index}`, message, 0, (err) => {
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.status(200).send(message)
    }
  })
})

export = router