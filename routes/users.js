const express = require("express");
const {
  body,
  param,
  query,
  validationResult,
  sanitizeBody,
} = require("express-validator");
const TestUserModel = require("../models/TestUserModel");
const upload = require("../middlewares/fileUploadMiddleware");
const { create_image_data } = require("../controllers/TestUserController");

module.exports = (app) => {
  const router = express.Router();

  router.post(
    "/addUsers",
    body("firstName", "Title Field is required.").notEmpty(),
    body("lastName", "Sub Title Field is required.").notEmpty(),
    async (req, res) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: `Validation Error`,
            errors: errors.array(),
          });
        } else {
          try {
            const newUser = await TestUserModel.create(req.body);
            return res.status(201).json({
              status: true,
              message: "User Added Successfully.",
              data: newUser,
            });
          } catch (e) {
            console.log(e);
            return res.status(500).json({
              status: false,
              message: `Error Creating User.  - ${e}`,
            });
          }
        }
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: false, message: `Error Adding User. - ${err}` });
      }
    }
  );

  router.get("/getUserList", async (req, res) => {
    try {
      const userList = await TestUserModel.find({});
      return res.status(200).json({
        status: true,
        message: "User List Fetched Successfully.",
        data: userList,
      });
    } catch (error) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: `Error Fetching User List. - ${err}` });
    }
  });

  router.get("/getUser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const userInfo = await TestUserModel.findById(id);
      return res.status(200).json({
        status: true,
        message: "User Fetched Successfully.",
        data: userInfo,
      });
    } catch (error) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: `Error Fetching User info. - ${err}` });
    }
  });

  router.put("/updateUser/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const userInfo = await TestUserModel.findByIdAndUpdate(id, req.body);

      if (!userInfo) {
        return res.status(404).json({
          status: false,
          message: `User not found related to given id : ${id} .`,
        });
      } else {
        const updatedUser = await TestUserModel.findById(id);

        return res.status(200).json({
          status: true,
          message: "User Updated Successfully.",
          data: updatedUser,
        });
      }
    } catch (error) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: `Error Updating User info. - ${err}` });
    }
  });

  router.delete("/deleteUser/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const user = await TestUserModel.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({
          status: false,
          message: `User not found related to given id : ${id} .`,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "User Deleted Successfully.",
        });
      }
    } catch (error) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, message: `Error Deleting User. - ${err}` });
    }
  });

  router.post(
    "/addUsersWimage",
    upload.single("image_url"),
    body("firstName", "Title Field is required.").notEmpty(),
    body("lastName", "Sub Title Field is required.").notEmpty(),
    async (req, res) => {
      // const validation_errors = validationResult(req);
      // if (!validation_errors.isEmpty()) {
      // 	return res.status(400).json({
      // 		status: false,
      // 		message: `Validation Error`,
      // 		errors: validation_errors.array(),
      // 	});
      // }

      // try {
      // 	if (!req.file) {
      // 		res.status(401).json({
      // 			status: false,
      // 			message: 'Please Provide an image to upload.',
      // 		});
      // 	}
      // 	// const uploaded_image = await create_image_data(req.file, req.body);
      // 	const uploaded_image = await create_image_data();

      // 	console.log('uploaded_image :', uploaded_image);
      // 	return res.status(201).json({
      // 		status: true,
      // 		message: 'User With Image Added Successfully.',
      // 		data: uploaded_image,
      // 	});
      // } catch (e) {
      // 	console.log(e);
      // 	return res
      // 		.status(500)
      // 		.json({ status: false, message: `Error Creating User.  - ${e}` });
      // }

      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: `Validation Error`,
            errors: errors.array(),
          });
        } else {
          try {
            if (!req.file) {
              res.status(401).json({
                status: false,
                message: "Please Provide an image to upload.",
              });
            }
            const uploaded_image = await create_image_data(req.file, req.body);
            //const uploaded_image = await create_image_data();

            return res.status(201).json({
              status: true,
              message: "User With Image Added Successfully.",
              data: uploaded_image,
            });
          } catch (e) {
            console.log(e);
            return res.status(500).json({
              status: false,
              message: `Error Creating User.  - ${e}`,
            });
          }
        }
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: false, message: `Error Adding User. - ${err}` });
      }
    }
  );

  router.post(
    "/registerUsers",
    body("firstName", "Title Field is required.").notEmpty(),
    body("lastName", "Sub Title Field is required.").notEmpty(),
    async (req, res) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: `Validation Error`,
            errors: errors.array(),
          });
        } else {
          try {
            const newUser = await TestUserModel.create(req.body);
            return res.status(201).json({
              status: true,
              message: "User Added Successfully.",
              data: newUser,
            });
          } catch (e) {
            console.log(e);
            return res.status(500).json({
              status: false,
              message: `Error Creating User.  - ${e}`,
            });
          }
        }
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: false, message: `Error Adding User. - ${err}` });
      }
    }
  );

  app.use("/api", router);
};
