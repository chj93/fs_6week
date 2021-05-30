const { Router } = require('express');
const router = Router();
const ctrl = require('./posts.ctrl')
const paginate = require('express-paginate');

//TODO: max limit 수정해야될지도
router.get("/", paginate.middleware(2) , ctrl.get_posts_list );
router.post("/", ctrl.post_posts_write);
router.put("/:id", ctrl.put_posts_edit);
router.delete("/:id", ctrl.delete_posts);

module.exports = router;
