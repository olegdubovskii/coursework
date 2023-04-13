const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accessTokenSecret = crypto.randomBytes(64).toString('hex');
const refreshTokenSecret = crypto.randomBytes(64).toString('hex');

class AuthMiddleware {
    static validateAccessToken (req) {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return 401;
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return 401;
        }
        try {
          const userData = jwt.verify(accessToken, accessTokenSecret);
          return userData;
        } catch(JsonWebTokenError) {
          return 401;
        }  
    };

    static generateTokens(payload) {
        const accessToken = jwt.sign(
          payload,
          accessTokenSecret,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          payload,
          refreshTokenSecret,
          { expiresIn: "30d" }
        );
        return { accessToken, refreshToken };
      }
}

module.exports = AuthMiddleware;