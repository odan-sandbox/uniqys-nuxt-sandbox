import { Router } from "express"

const router = Router()

router.get('/message', function(_, res) {
  res.send('message!');
});

export = router