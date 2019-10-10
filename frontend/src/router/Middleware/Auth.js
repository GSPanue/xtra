class Auth {
  handle(to, from, next) {
    /**
     * ToDo:
     * (1) Check if user is signed in
     * (2) Navigate to home view if signed in
     * (3) Navigate to signIn view if not signed in
     */
    return next();
  }
}

export default Auth;
