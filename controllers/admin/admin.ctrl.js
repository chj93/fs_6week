const models = require("../../models");

/*
2. 아래와 같이 geo 필드에 데이터를 저장하고 수정하도록
아래 두 API를 작성한다.
POST /admin/contacts/write
POST /admin/contacts/edit/:id

넘겨주는 파라미터는 template/admin/write.html 의 input을 참고한다.
*/

exports.get_contacts = async (_, res) => {
  try {
    const contacts = await models.Contacts.findAll({});
    res.render("admin/contacts.html", { contacts });
  } catch (e) {}
};

exports.get_contacts_write = (_, res) => {
  res.render("admin/write.html");
};

exports.post_contacts_write = async (req, res) => {
  try {
    // 여기작성
    req.body.geo = {
      type: 'Point',
      coordinates: [
        // 경도
        req.body.geo.split(',')[0] ,
        // 위도
        req.body.geo.split(',')[1]
      ]
    };

    await models.Contacts.create(req.body);
    res.redirect("/admin/contacts");
  } catch (e) {}
};

exports.get_contacts_detail = async (req, res) => {
  try {
    const contact = await models.Contacts.findOne({
      where: {
        id: req.params.id
      },
      include: ["Memo"]
    });

    res.render("admin/detail.html", { contact });
  } catch (e) {}
};

exports.get_contacts_edit = async (req, res) => {
  try {
    const contact = await models.Contacts.findByPk(req.params.id);
    res.render("admin/write.html", { contact });
  } catch (e) {}
};

exports.post_contacts_edit = async (req, res) => {
  try {
    // 여기 작성
    req.body.geo = {
      type: 'Point',
      coordinates: [
        req.body.geo.split(',')[0] ,
        req.body.geo.split(',')[1]
      ]
    };
    await models.Contacts.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect(`/admin/contacts/detail/${req.params.id}`);
  } catch (e) {}
};

exports.get_contacts_delete = async (req, res) => {
  try {
    await models.Contacts.destroy({
      where: {
        id: req.params.id
      }
    });
    res.redirect("/admin/contacts");
  } catch (e) {}
};

exports.add_memo = async (req, res) => {
  try {
    const contact = await models.Contacts.findByPk(req.params.id);
    // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
    await contact.createMemo(req.body);

    res.redirect("/admin/contacts/detail/" + req.params.id);
  } catch (e) {
    console.log(e);
  }
};

exports.remove_memo = async (req, res) => {
  try {
    await models.ContactsMemo.destroy({
      where: {
        id: req.params.memo_id
      }
    });

    res.redirect("/admin/contacts/detail/" + req.params.contact_id);
  } catch (e) {}
};
