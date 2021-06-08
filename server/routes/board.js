const router = require("express").Router();
const protect = require("../middleware/auth");
const {
  createBoard,
  getBoard,
  updateBoardName,
  deleteBoard,
  swapBoardColumns,
  createBoardColumn,
  deleteBoardColumn,
} = require("../controllers/board");

//router.use(protect);

router.route("/").post(createBoard);
router.route("/:id").get(getBoard);
router.route("/:id").patch(updateBoardName);
router.route("/:id/addColumn").patch(createBoardColumn);
router.route("/:id/swapColumns").patch(swapBoardColumns);
router.route("/:id/removeColumn").delete(deleteBoardColumn);
router.route("/:id").delete(deleteBoard);

module.exports = router;
