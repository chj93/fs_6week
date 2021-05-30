const models = require("../../models");

exports.get_posts_list = async(req,res) => {

  try{

    const posts = await models.Posts.findAll({
      limit : req.query.limit,
      offset : req.offset,
      order : [ ['createdAt' , 'desc'] ]
    })

    res.json({
      posts
    })

  }catch(e){
    console.log('post list error')
  }
}

exports.post_posts_write = async(req,res) => {
  try {
    await models.Posts.create(req.body);
    res.json({
      message: "success"
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
}

exports.put_posts_edit = async (req, res) => {
  try {
    await models.Posts.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({
      message: "success"
    });

  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
}


exports.delete_posts = async (req, res) => {
  try {
    await models.Posts.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({
      message: "success"
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
};
