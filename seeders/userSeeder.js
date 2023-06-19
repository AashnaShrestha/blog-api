module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Users",
            [
                {
                    name: "John",
                    email: "jsmith@gmail.com",
                    password: "Smith",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    firstName: "Kobe",
                    lastName: "Bryant",
                    email: "kbryant@gmail.com",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ]
        );
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Users", null, {})
    }
};