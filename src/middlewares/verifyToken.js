const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const ERRORMESSAGE = require("../constants/error");
const {
  sign,
  accessTokenVerify,
  refreshTokenVerify,
} = require("../service/jwtUtils");

exports.verfityToken = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (accessToken && refreshToken) {
      const authResult = await accessTokenVerify(accessToken);
      const decoded = jwt.decode(accessToken);
      const refreshResult = await refreshTokenVerify(
        refreshToken,
        decoded.id,
        next
      );

      if (!authResult.type && authResult.message === "jwt expired") {
        if (!refreshResult) {
          return next(createError(401, ERRORMESSAGE.ERROR_401));
        }

        const newAccessToken = sign(decoded.id);

        res.status(201).cookie("accessToken", newAccessToken, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
        });

        return next();
      }

      req.user = decoded.id;
      return next();
    }

    return next(createError(401, ERRORMESSAGE.ERROR_401));
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_401;
    error.status = 401;

    return next(error);
  }
};
