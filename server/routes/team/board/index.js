const express = require("express");
const { body, param } = require("express-validator");
const protect = require("../../../middleware/auth");
const {
  checkForValidationErrors,
} = require("../../../middleware/validationCheck");
const { hasAccessToBoard } = require("../../../middleware/board");
const { teamBoardController } = require("../../../controllers/teamController");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  body("name").not().isEmpty().withMessage("Name cannot be empty"),
  checkForValidationErrors,
  teamBoardController.createTeamBoard
);

router.get(
  "/:boardId",
  param("boardId").isMongoId().withMessage("Please provide a proper board id"),
  hasAccessToBoard,
  checkForValidationErrors,
  teamBoardController.getTeamBoard
);

router.post(
  "/:boardId/collaborators",
  param("boardId").isMongoId().withMessage("Please provide a proper board id"),
  body("isAdmin").isBoolean().withMessage("isAdmin must be a proper boolean"),
  body("user").isMongoId().withMessage("Please provide a proper user id"),
  hasAccessToBoard,
  checkForValidationErrors,
  teamBoardController.addUserToBoard
);

router.delete(
  "/:boardId/collaborators/:user",
  param("boardId").isMongoId().withMessage("Please provide a proper board id"),
  param("user").isMongoId().withMessage("Please provide a proper user id"),
  hasAccessToBoard,
  checkForValidationErrors,
  teamBoardController.removeUserFromBoard
);

module.exports = router;
