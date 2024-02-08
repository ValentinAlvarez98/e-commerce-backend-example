import {
      Router
} from "express";
import usersModel from "../../models/schemas/users.schema.js";
import {
      createHash,
      compareHash
} from "../../utils/bcrypt/bcrypt.utils.js";

const usersRouter = Router();

usersRouter.get("/getAll", async (req, res) => {

      try {

            const users = await usersModel.find({}).lean();

            res.status(200).json({
                  status: "success",
                  message: "All users",
                  payload: users
            })

      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "Users not found",
                  payload: error
            })

      }

})

usersRouter.get("/getOne/:id", async (req, res) => {

      try {

            const userId = req.params.id;

            const user = await usersModel.findById(userId).lean();

            res.status(200).json({
                  status: "success",
                  message: "User found",
                  payload: user
            })

      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "User not found",
                  payload: error
            })

      }

});

usersRouter.post("/addOne", async (req, res) => {

      try {

            const enteredUser = req.body;

            const hashedPassword = createHash(enteredUser.password);

            const userToAdd = {
                  ...enteredUser,
                  password: hashedPassword
            }

            const reponse = await usersModel.create(userToAdd);

            res.status(200).json({
                  status: "success",
                  message: "User added",
                  payload: reponse
            })

      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "User not added",
                  payload: error
            })

      }


});

usersRouter.put("/updateOne/:id", async (req, res) => {

      try {

            const userId = req.params.id;

            const newUserData = req.body;

            const newAddress = newUserData.address;

            const oldUser = await usersModel.findById(userId).lean();

            const oldAddress = oldUser.addresses;

            if (newAddress) {

                  if (oldAddress.length < 3) {

                        const updatedAddresses = [...oldAddress, newAddress];

                        newUserData.addresses = updatedAddresses;

                  } else {

                        return res.status(400).json({
                              status: "error",
                              message: "User cannot have more than 3 addresses"
                        })

                  }

            }

            const newUser = {
                  ...oldUser,
                  ...newUserData,
            }

            const response = await usersModel.findByIdAndUpdate(userId, newUser, {
                  new: true
            });

            res.status(200).json({
                  status: "success",
                  message: "User updated successfully",
                  payload: response
            })

      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "User not updated",
                  payload: error
            })

      }

});

usersRouter.delete("/deleteOne/:id", async (req, res) => {

      try {

            const userId = req.params.id;

            const response = await usersModel.findByIdAndDelete(userId);

            res.status(200).json({
                  status: "success",
                  message: "User deleted successfully",
                  payload: response
            })

      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "User not deleted",
                  payload: error
            })

      }

});

usersRouter.delete("/deleteInactives", async (req, res) => {

      try {

            const users = await usersModel.find({}).lean();
            const now = new Date();

            const inactiveUsersIds = users.filter(user => {

                  const lastLogin = new Date(user.last_connection.last_login);
                  const lastLogout = user.last_connection.last_logout ? new Date(user.last_connection.last_logout) : null;
                  const lastModification = new Date(user.last_connection.last_modification);

                  const mostRecentTime = [lastLogin, lastLogout, lastModification].filter(time => time !== null).sort((a, b) => b - a)[0];

                  return now - mostRecentTime > 10000;

            }).map(user => user._id);

            if (inactiveUsersIds.length > 0) {

                  const deletedUsers = await usersModel.deleteMany({
                        _id: {
                              $in: inactiveUsersIds
                        }
                  });

                  res.status(200).json({
                        status: "success",
                        message: "Inactive users deleted",
                        payload: deletedUsers
                  });

            } else {

                  res.status(200).json({
                        status: "success",
                        message: "No inactive users found",
                        payload: {}
                  });

            }

      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "Inactive users not deleted",
                  payload: error
            });

      }

});


usersRouter.post("/login", async (req, res) => {

      try {

            const {
                  email,
                  password
            } = req.body;

            const user = await usersModel.findOne({
                  email: email
            }).lean();

            if (!user) {

                  return res.status(400).json({
                        status: "error",
                        message: "User not found"
                  })

            }

            const compare = compareHash(password, user.password);

            if (!compare) {

                  return res.status(400).json({
                        status: "error",
                        message: "Password incorrect"
                  })

            }

            const oldConnection = user.last_connection;

            const newConnection = {
                  last_login: new Date().toISOString(),
                  last_logout: oldConnection.last_logout ? new Date(oldConnection.last_logout).toISOString() : null,
                  last_modification: oldConnection.last_modification ? new Date(oldConnection.last_modification).toISOString() : null
            };

            const userToUpdate = {
                  ...user,
                  last_connection: newConnection,
            }

            const loggedUser = await usersModel.findByIdAndUpdate(user._id, userToUpdate, {
                  new: true
            });

            req.session.user = {
                  email: loggedUser.email,
                  _id: loggedUser._id,
                  role: loggedUser.role
            }

            res.status(200).json({

                  status: "success",
                  message: "User logged in",
                  payload: {
                        ...loggedUser._doc,
                        password: null
                  }

            })

      } catch (error) {

            console.log(error);

            res.status(400).json({
                  status: "error",
                  message: "Login error",
                  payload: error
            })

      }

});

usersRouter.get("/logout/:id", async (req, res) => {

      try {

            const userId = req.params.id;

            /* const session = req.session.user;

            if (!session) {

                  return res.status(400).json({
                        status: "error",
                        message: "Session not found"
                  })

            } */

            /* const user = await usersModel.findOne({
                  email: session.email
            }).lean();
                  */

            const user = await usersModel.findById(userId).lean();

            if (!user) {

                  return res.status(400).json({
                        status: "error",
                        message: "User not found"
                  })

            }

            const oldConnection = user.last_connection;

            const newConnection = {
                  last_login: oldConnection.last_login ? new Date(oldConnection.last_login).toISOString() : null,
                  last_logout: new Date().toISOString(),
                  last_modification: oldConnection.last_modification ? new Date(oldConnection.last_modification).toISOString() : null
            };

            const userToUpdate = {
                  ...user,
                  last_connection: newConnection
            }

            const userLoggedOut = await usersModel.findByIdAndUpdate(userId, userToUpdate, {
                  new: true
            });

            /* req.session.destroy(); */

            res.status(200).json({
                  status: "success",
                  message: "User logged out",
                  payload: {
                        ...userLoggedOut._doc,
                        password: null
                  }
            })


      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "Logout error",
                  payload: error
            })

      }

});


export default usersRouter;