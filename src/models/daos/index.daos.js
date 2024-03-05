import {
      UsersDAO
} from "./users/users.dao.js";
import {
      NewsletterDAO
} from "./users/newsletter/newsletter.dao.js";

const DAOs = {
      users: new UsersDAO(),
      newsletter: new NewsletterDAO()
};

export default DAOs;