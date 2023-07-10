const express = require("express");
const { centerInfo, registerSingleUser, loginUser, getSchedule, existedUser } = require("../Controller/Controllers");
const router = express.Router();

router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.get("/get/center/info/:area",centerInfo);
router.post("/create/single/user",registerSingleUser);
router.post("/login/user",loginUser);
router.post("/add/schedule",getSchedule);
router.get("/find/user/:nid",existedUser);

module.exports = router;