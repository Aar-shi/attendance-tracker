import express from 'express';
import { protectRoute, userIsTeacher } from '../middleware/auth.middleware.js';
import { createClass, enrollClass, fetchClass, fetchStudentsInClass } from '../controllers/class.controller.js';

const router = express.Router();

router.post("/create", protectRoute, userIsTeacher, createClass);
router.post("/enroll", protectRoute, enrollClass);
router.get("/fetch", protectRoute, fetchClass);
router.get("/students/:classId", protectRoute, fetchStudentsInClass);


export default router;