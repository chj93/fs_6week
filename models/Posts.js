module.exports = function(sequelize, DataTypes) {
  const Posts = sequelize.define('Posts', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING},
        content: {type: DataTypes.TEXT}
      }
  );

  Posts.associate = (models) => {
    Posts.belongsToMany(models.Tag, {
      through: {
        model: 'TagPosts',
        unique: false
      },
      as: 'Tag',
      foreignKey: 'post_id',
      sourceKey: 'id',
      constraints: false
    });
  }
  return Posts;
}
