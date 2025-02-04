const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login?error=Please login first");
  }
  next();
};

const isAdopter = (req, res, next) => {
  if (req.session.user.userRole !== "adopter") {
    return res.redirect("/login?error=Please login as adopter");
  }
  next();
};

const isShelter = (req, res, next) => {
  if (req.session.user.userRole !== "shelter") {
    return res.redirect("/login?error=Please login as shelter");
  }
  next();
};

module.exports = { isAuthenticated, isAdopter, isShelter };
