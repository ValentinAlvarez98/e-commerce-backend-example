import {
      UsersDAO
} from "./users/users.dao.js";

const DAOs = {
      users: new UsersDAO(),
};

export default DAOs;