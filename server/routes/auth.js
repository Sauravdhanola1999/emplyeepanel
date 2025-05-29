import { Router } from "express";
const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  res.cookie('auth', 'mock-token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false
  });

  return res.status(200).json({ message: 'Login successful', user: { username } });
});



router.post("/signout", (req, res) => {
  res.clearCookie("username");
  res.json({ message: "Signed out successfully" });
});

export default router;
