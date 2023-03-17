const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { sign, verify, refreshVerify } = require("../service/jwtUtils");

exports.verfityToken = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (accessToken && refreshToken) {
      const authResult = await verify(accessToken);
      const decoded = jwt.decode(accessToken);
      const refreshResult = await refreshVerify(refreshToken, decoded.id);

      if (authResult.type === false && authResult.message === "jwt expired") {
        if (refreshResult === false) {
          return next(createError(401, "권한이 없습니다."));
        }

        const newAccessToken = sign(decoded.id);

        return res.json({
          result: "access token 발급",
          accessToken: newAccessToken,
          refreshToken,
        });
      }

      req.user = authResult.id;
      next();
    }

    return next(createError(401, "쿠키에 토큰이 없습니다."));
  } catch (error) {
    next(error);
  }
};
