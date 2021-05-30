const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Contacts = sequelize.define("Contacts", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING, comment: "주소" },
    price: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    geo: { type: DataTypes.GEOMETRY('POINT'), comment: '위도,경도'},
  });

  Contacts.associate = (models) => {
    Contacts.hasMany(models.ContactsMemo, {
      as: "Memo",
      foreignKey: "contact_id",
      sourceKey: "id",
      onDelete: "CASCADE"
    });
  };

  Contacts.prototype.dateFormat = (date) => moment(date).format("YYYY-MM-DD");

  return Contacts;
};
