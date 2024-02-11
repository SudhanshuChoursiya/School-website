import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { contactModel } from "../models/contactform.js";
import { signUpModel } from "../models/signup.js";
import { timeTableModel } from "../models/timetable.js";
import { noticeModel } from "../models/notice.js";
import verifyEmail from "../services/nodemailer/verifyEmail.js";
import verifyToken from "../middleware/auth.js";

import forgetPasswordEmail from "../services/nodemailer/forget-password-mail.js";

const contactController = (req, res) => {
  const { name, email, mobileno, message } = req.body;

  let contactData = new contactModel({
    name: name,
    email: email,
    mobileno: mobileno,
    message: message,
  });
  contactData
    .save()
    .then(() => {
      res.status(200).json({ msg: "Response recorded" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "some error occured" });
    });
};

const signupController = async (req, res) => {
  const uniqeEmail = await signUpModel.find({ email: req.body.email });

  if (uniqeEmail.length != 0) {
    return res.status(400).json({ msg: "email already exists." });
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const { name, email, role } = req.body;

  const signUpModelData = new signUpModel({
    name: name,
    email: email,
    password: hashPassword,
    role: role,
  });
  signUpModelData
    .save()
    .then((response) => {
      verifyEmail(response.email, response._id);

      res.status(200).json({
        msg: "signUpModel successfully !",
        signUpModelData: signUpModelData,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};

const verifyEmailController = async (req, res) => {
  try {
    const id = req.params.id;

    const verify_status = await signUpModel.findOne({ _id: id });
    if (verify_status.is_verify === false) {
      const verified = await signUpModel.updateOne(
        { _id: id },
        { $set: { is_verify: true } }
      );
      res.redirect("http://localhost:3000/verification-success");
    } else {
      res.redirect("http://localhost:3000/");
    }
  } catch (err) {
    res.status(501).json({ msg: "error" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const matchedUser = await signUpModel.findOne({ email: email });
  if (matchedUser) {
    const checkPassword = await bcrypt.compare(password, matchedUser.password);
    if (checkPassword) {
      if (matchedUser.is_verify === true) {
        const token = jwt.sign({ matchedUser }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        res.cookie("role", matchedUser.is_admin ? "admin" : "user", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.status(200).json({ msg: "login succesfull", user: matchedUser });
      } else {
        res.status(400).json({ msg: "Please verify your email first" });
      }
    } else {
      res.status(400).json({ msg: "email and password not matched" });
    }
  } else {
    res.status(400).json({ msg: "email and password not matched" });
  }
};

const checkAuthController = async (req, res) => {
  const isAuthenticated = req.isAuthenticated;

  if (isAuthenticated === true) {
    const id = req.userId;
    try {
      const loginUserDetails = await signUpModel.findOne({ _id: id });
      res.status(200).json({ authenticated: true, userInfo: loginUserDetails });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ authenticated: false });
  }
};

const logoutController = (req, res) => {
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  res
    .status(200)
    .clearCookie("token", options)
    .clearCookie("role", options)
    .json({ msg: "Logout successfully" });
};

const resetPasswordEmailController = async (req, res) => {
  const email = req.body.email;
  const checkEmailInDb = await signUpModel.findOne({ email: email });
  if (checkEmailInDb) {
    const token = uuidv4();

    const add_token = signUpModel
      .updateOne({ email: email }, { $set: { token: token } })
      .then((response) => {
        forgetPasswordEmail(email, token);

        res.cookie("reset", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });

        res.status(200).json({ msg: "Password reset link has been sent" });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Can’t send email now,try again letter" });
      });
  } else {
    res.status(500).json({ msg: "Entered Email not exists" });
  }
};

const forgetPasswordController = async (req, res) => {
  const token = req.params.token;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  if (password === cpassword) {
    const newhashPassword = await bcrypt.hash(req.body.password, 10);
    const updatedpassword = signUpModel
      .updateOne(
        { token: token },
        { $set: { password: newhashPassword, token: "" } }
      )
      .then(() => {
        res.cookie("reset", "", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: new Date(0),
        });
        res.status(200).json({ msg: "password reset successfull" });
      })
      .catch((err) => {
        res.status(400).json({ msg: "error" });
      });
  } else {
    res.status(400).json({ msg: "password and confirm password not matched" });
  }
};

const addTimeTableController = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ msg: "invaild file type" });
    }

    const { title, standard } = req.body;

    if (req.file) {
      const cloudinaryResponse = req.resultData;

      const secureUrl = cloudinaryResponse.secure_url;
      const publicId = cloudinaryResponse.public_id;

      const timeTableData = await new timeTableModel({
        title: title,
        standard: standard,
        file_url: secureUrl,
        cloudinary_public_id: publicId,
      }).save();

      if (!timeTableData) {
        res
          .status(400)
          .json({ msg: "unexpected error occured try again latter !" });
      }
      res.status(200).json({ msg: "time table added." });
    }
  } catch (error) {
    console.log(error);
  }
};

const addNoticeController = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ msg: "invaild file type" });
    }

    const { title } = req.body;

    if (req.file) {
      const cloudinaryResponse = req.resultData;

      const secureUrl = cloudinaryResponse.secure_url;
      const publicId = cloudinaryResponse.public_id;

      const noticeData = await new noticeModel({
        title: title,
        file_url: secureUrl,
        cloudinary_public_id: publicId,
      }).save();

      if (!noticeData) {
        res
          .status(400)
          .json({ msg: "unexpected error occured try again latter !" });
      }
      res.status(200).json({ msg: " notice added." });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllUserQueryController = async (req, res) => {
  try {
    const queries = await contactModel.find();
    if (!queries) {
      return res.status(404).json({ msg: "failed to load data" });
    }

    res.status(200).json({ msg: "success", allQueries: queries });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserQueryController = async (req, res) => {
  try {
    const queryIds = req.body.queryIds;
    console.log(queryIds);
    const deletedQuery = await contactModel.deleteMany({
      _id: { $in: queryIds },
    });

    console.log(deletedQuery);
    if (deletedQuery.deletedCount === 0) {
      return res.status(400).json({ msg: "unexpected error,try again letter" });
    }

    res.status(200).json({ msg: "query deleted !" });
  } catch (err) {
    console.log(err);
  }
};

const editUserQueryController = async (req, res) => {
  try {
    const queryId = req.params.id;
    const incomingData = req.body;

    const existedQuery = await contactModel.findById(queryId);
    if (!existedQuery) {
      return res.status(404).json({ msg: "query not exists" });
    }

    if (
      !incomingData.name ||
      incomingData.name.trim() === "" ||
      !incomingData.email ||
      incomingData.email.trim() === "" ||
      !incomingData.mobileno ||
      incomingData.mobileno.toString().trim() === ""
    ) {
      return res.status(400).json({ msg: "required field can not be empty" });
    }
    const updatingFields = {};

    Object.keys(incomingData).forEach((field) => {
      if (
        typeof incomingData[field] === "string" &&
        typeof existedQuery[field] === "string"
      ) {
        if (incomingData[field].trim() !== existedQuery[field].trim()) {
          updatingFields[field] = incomingData[field];
        }
      } else if (incomingData[field] !== existedQuery[field]) {
        updatingFields[field] = incomingData[field];
      }
    });

    if (Object.keys(updatingFields).length === 0) {
      return res
        .status(400)
        .json({ msg: "please do any changes before saving" });
    }

    const editedQuery = await contactModel.findByIdAndUpdate(
      queryId,
      updatingFields,
      { new: true }
    );

    if (!editedQuery) {
      return res.status(400).json({ msg: "unexpected error,try again letter" });
    }

    res.status(200).json({ msg: "query edit successfully !" });
  } catch (err) {
    console.log(err);
  }
};

export {
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
};
