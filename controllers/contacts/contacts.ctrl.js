const models = require("../../models");
/*
3.
GET /contacts?lat=37.49573236168477&lng=127.02936282688312
위도 경도를 입력한 위치부터 가까운 위치 순으로 출력되도록 작성하시오. (
*/

exports.get_contacts = async (req, res) => {
  try {
    // 이아래 작성

    res.json({
      contacts
    });
  } catch (e) {
    console.log(e);
  }
};

exports.post_contacts_user = async (req, res) => {
  try {
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

exports.delete_contacts_user = async (req, res) => {
  try {
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
