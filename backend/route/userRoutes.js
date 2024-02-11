import express from "express";
const router = express.Router();
import {
  contactController,
  signupController,
  verifyEmailController,
  loginController,
  checkAuthController,
  logoutController,
  resetPasswordEmailController,
  forgetPasswordController,
  addTimeTableController,
  addNoticeController,
  getAllUserQueryController,
  deleteUserQueryController,
  editUserQueryController,
} from "../controller/userControllers.js";
import verifyToken from "../middleware/auth.js";

import upload from "../middleware/multer.js";

import {
  uploadToCloudinary,
  removeFromCloudinary,
} from "../middleware/cloudinary.js";
router.route("/contact").post(contactController);

router.route("/signup").post(signupController);

router.route("/verify-email/:id").get(verifyEmailController);

router.route("/login").post(verifyToken, loginController);

router.route("/check-auth").get(verifyToken, checkAuthController);

router.route("/logout").post(logoutController);
router.route("/send-reset-password-link").post(resetPasswordEmailController);

router.route("/forget-password/:token").post(forgetPasswordController);

//add time table route
router
  .route("/add-time-table")
  .post(upload.single("file"), uploadToCloudinary, addTimeTableController);

//add notice route
router
  .route("/add-notice")
  .post(upload.single("file"), uploadToCloudinary, addNoticeController);

//get all userQuery

router.route("/get-all-userquery").get(getAllUserQueryController);

//deleting user-query
router.route("/delete-user-query").delete(deleteUserQueryController);

//edit user query
router.route("/edit-user-query/:id").put(editUserQueryController);

export default router;
