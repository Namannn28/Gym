"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercise_controller_1 = require("../controllers/exercise.controller");
const router = (0, express_1.Router)();
router.get('/', exercise_controller_1.getExercises);
router.get('/:id', exercise_controller_1.getExerciseById);
exports.default = router;
