const classController = require('../Controllers/class')
const express = require('express');
const router = express.Router();

router.route("/:sid")
    .get(classController.getClassesEnrolledByStudent);

router.route("/:sid/:cid")
    .get(classController.getSpecificClassEnrolledByStudent);

router.route("/:sid/teachers")
    .get(classController.getTeachersOfEnrolledClasses);

module.exports = router;