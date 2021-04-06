const jwt = require("jsonwebtoken");

function checkForBody(req, res) {
    // null and undefined check
    const body = req.body;
    if (
      body && // checks body exists
      Object.keys(body).length === 0 && // checks there is at least one key
      body.constructor === Object // checks body is an object
    ) {
      res.json("No body supplied");
      return false;
    }
    return true;
  }

const JWT_SECRET = "password123";

  const authJWT = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
      const token = auth.split(" ")[1];
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
  const requireAdmin = (req, res, next) => {
    authJWT(req, res, next);
    if (req.user.admin === true) res.status(401).json("Admins only.");
  };
  

function randNums(numOfEx, lengthOfArray) {
    let randNums = [];
    for (let i = 0; i < numOfEx; i++) {
      let rand = Math.floor(Math.random() * lengthOfArray) + 1;
      randNums.push(rand);
    }
    return randNums;
  }
  
exports.checkForBody = checkForBody;
exports.JWT_SECRET = JWT_SECRET;
exports.requireAdmin = requireAdmin;
exports.randNums = randNums;
