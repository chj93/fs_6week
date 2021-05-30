const { Router } = require('express');
const router = Router();
const ctrl = require('./posts.ctrl')
const paginate = require('express-paginate');

router.get("/", paginate.middleware(5) , ctrl.get_posts_list );
router.post("/", ctrl.post_posts_write);
router.put("/:id", ctrl.put_posts_edit);
router.delete("/:id", ctrl.delete_posts);

router.post("/tag", ctrl.posts_write_tag);
router.delete('/tag/:post_id/:tag_id', ctrl.posts_delete_tag);
router.get('/search', ctrl.get_search);

module.exports = router;
