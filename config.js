module.exports = {
  saltWorkFactor: process.env.BCRYPT_WORK_FACTOR || 10,
  jwtSecret: process.env.JWT_SECRET || "s#@!vd<834!%s,wq|1|+_7b>",
};
