const router = require("express").Router();
const protect = require("../middleware/auth");
const {
  createBoard,
  getBoard,
  updateBoardName,
  reorderBoard,
  deleteBoard,
} = require("../controllers/board");

router.use(protect);

router.route("/").post(createBoard);
router.route("/:id").get(getBoard);
router.route("/:id").patch(updateBoardName);
router.route("/:id/reorder").patch(reorderBoard);
router.route(":id").delete(deleteBoard);

module.exports = router;
