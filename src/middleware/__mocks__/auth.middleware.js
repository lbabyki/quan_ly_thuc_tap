export const authMiddleware = () => (req, res, next) => {
  // Giả lập người dùng đăng nhập sẵn
  req.user = { id: "fakeUserId", role: "student" };
  next();
};
