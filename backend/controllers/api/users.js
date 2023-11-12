const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../../models/user");

module.exports = {
  create,
  login,
  checkToken,
  confirmEmail,
};

const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  tls: {
    secureProtocol: "TLSv1_2_method",
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// login User
async function login(req, res) {
  try {
    console.log("REQ BODY",req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    console.log(user);
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

// Create User
async function create(req, res) {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    const token = createJWT(user);

    // Send email to new user
    sendConfirmationEmail(user.email, user._id);

    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Check Token
async function checkToken(req, res) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    if (token) {
      const user = await User.findOne({ email: req.user.email });
      res.json({ name: req.user.name, token: token, isConfirmed: user.isEmailConfirmed ?? false });
    } else {
      res
        .status(401)
        .json({ error: "User not authenticated or token missing" });
    }
  } else {
    res.status(401).json({ error: "No token provided" });
  }
}

function createJWT(user) {
  // Expiring in 5 minutes for demonstration purposes only
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "5m" });
}

// Send confirmation email
function sendConfirmationEmail(userEmail, userId) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const HOST = isDevelopment ? `http://127.0.0.1:5501/frontend/` : `https://${process.env.FRONTEND_URL}`;

  console.log(
    "Sending confirmation email to " + userEmail,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Confirm your Email",
    text:
      "Please confirm your email by clicking the following link: " +
      `${HOST}confirm-email.html?token=${userId}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// Confirm email, setting isEmailConfirmed to true in DB
async function confirmEmail(req, res) {
  console.log(" in  confirmEmail");
  try {
    const userId = req.query.token;
    const user = await User.findById(userId);
    console.log("USER---->", user);
    if (!user) return res.status(400).send("Invalid token");

    user.isEmailConfirmed = true;
    await user.save();

    res.send("Email successfully confirmed!");
  } catch (err) {
    res.status(500).send("Error confirming email");
  }
}
