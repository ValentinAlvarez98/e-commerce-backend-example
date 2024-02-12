import DAOs from "../../models/daos/index.daos.js";

export class UserService {
      async findInactiveUsers() {

            const users = await DAOs.users.getAll();
            const now = new Date();

            return users.filter(user => {

                  const lastLogin = new Date(user.last_connection.last_login);
                  const lastLogout = user.last_connection.last_logout ? new Date(user.last_connection.last_logout) : null;
                  const lastModification = new Date(user.last_connection.last_modification);

                  const mostRecentTime = [lastLogin, lastLogout, lastModification].filter(time => time !== null).sort((a, b) => b - a)[0];

                  return now - mostRecentTime > 10000;

            }).map(user => user._id);
      }

      async deleteInactiveUsers(userIds) {

            return await DAOs.users.deleteMany(userIds);

      }

}