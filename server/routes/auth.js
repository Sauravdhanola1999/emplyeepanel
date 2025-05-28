import { Router } from "express";
const router = Router();

const adminUser = [{ f_sno: 1, f_userName: "admin", f_Pwd: "admin123" }];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (adminUser.f_userName && adminUser.f_Pwd) {
    res.cookie("username", adminUser.f_userName, { httpOnly: true });
    return res.json({
      message: "Login successful",
      username: adminUser.f_userName,
    });
  }
  console.log("Username from cookie:", req.cookies.username);
  res.status(401).json({ message: "Invalid login details" });
});

router.post("/signout", (req, res) => {
  res.clearCookie("username");
  res.json({ message: "Signed out successfully" });
});

export default router;
