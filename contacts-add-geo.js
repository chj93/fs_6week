"use strict";
/*1. Contacts Model의 geo 필드를 생성하려고한다. (30)

아래 처럼 파일을 작성하였다고 했을 때,
$ npx sequelize-cli db:migrate
$ npx sequelize-cli migration:generate --name contacts-add-geo


npx sequelize-cli db:migrate -> geo 필드 추가 ( mysql Point 타입 )
npx sequelize-cli db:migrate:undo -> geo 필드 제거
위와 같이 동작하도록, contacts-add-geo.js 파일을 작성난뒤
추가된 필드를 적용하도록 Contacts,js 파일을 수정하시오.
*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Contacts', 'geo',
        { type: Sequelize.DataTypes.GEOMETRY( 'Point')
        })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn( 'Contacts', 'geo' )
  }
};
