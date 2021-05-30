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

exports.posts_write_tag = async (req, res) => {
  try {
    const tag = await models.Tag.findOrCreate({
      where: {
        name : req.body.name
      }
    });

    const posts = await models.Posts.findByPk(req.body.post_id);
    const status = await posts.addTag(tag[0]);

    res.json({
      status : status
    })

  } catch (e) {
    res.json(e)
  }
}

exports.posts_delete_tag = async (req, res) => {
  try {
    const posts = await models.Posts.findByPk(req.params.post_id);
    const tag = await models.Tag.findByPk(req.params.tag_id);

    const result = await posts.removeTag(tag);

    res.json({
      result : result
    });
  } catch (e) {
    console.log(e);
  }
}
exports.get_search = async (req, res) => {
  try {
    const posts = await models.Posts.findAll({

      include : [ 'Tag' ],

      where : {
        ...(
            //posts title
            //tag name

            // 검색어가 있는 경우
            ('name' in req.query && req.query.name) ?
                {
                  // + 태그에서 가져옴 or
                  [models.Sequelize.Op.or] : [
                    models.Sequelize.where( models.Sequelize.col('Tag.name') , {
                      [models.Sequelize.Op.like] : `%${req.query.name}%`
                    }),
                    {
                      'title' : {
                        [models.Sequelize.Op.like] : `%${req.query.name}%`
                      }
                    }
                  ],
                }
                :
                '' )
      }


    });

    res.json({
      posts
    })


  } catch (e) {
    console.log(e);
  }
}
