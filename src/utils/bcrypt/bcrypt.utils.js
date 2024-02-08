import bcrypt from 'bcrypt';

export const createHash = (password) => {

      const salt = bcrypt.genSaltSync(10);

      const hash = bcrypt.hashSync(password, salt);

      return hash;

};

export const compareHash = (enterPassword, password) => {

      const compare = bcrypt.compareSync(enterPassword, password);

      return compare;

};