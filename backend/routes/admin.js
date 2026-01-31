import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, "qr.png");
  }
});

const upload = multer({ storage });

router.post("/upload-qr", upload.single("qr"), (req, res) => {
  res.json({
    success: true,
    path: "/uploads/qr.png"
  });
});

export default router;
