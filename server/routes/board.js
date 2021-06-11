const router = require("express").Router();
const protect = require("../middleware/auth");
const {
  createBoard,
  getBoard,
  updateBoardName,
  deleteBoard,
  swapColumns,
} = require("../controllers/board");

router.use(protect);

router.route("/:id").post(createBoard);
router.route("/:id").get(getBoard);
router.route("/:id").patch(updateBoardName);
router.route("/:id").delete(deleteBoard);
router.route("/batch/swapColumns").patch(swapColumns);

module.exports = router;
