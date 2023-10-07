import express from "express"
import userctrl from "../controllers/user.controller.js"
const router=express.Router();
router.route('/api/user/')
      .post(userctrl.signin)               
      .delete(userctrl.signout)
router.route('/api/user/register')
      .post(userctrl.register)
export default router