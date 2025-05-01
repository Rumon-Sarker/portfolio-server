import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin1";

export const login = (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, "shakib_portfolio", { expiresIn: "1h" });
        return res.status(200).json({ message: "Login successful", token });
    }

    return res.status(401).json({ message: "Invalid email or password" });
};
