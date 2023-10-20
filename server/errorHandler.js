function errorHandler(err,req,res,next) {
    console.log("MASUK ERROR HANDLER >>>>>>>>>>>>")
    console.log(`Error :`)
    console.log(err)
    console.log(`Error name : ${err.name}`)

    let message = "Internal Server Error"
    let status = 500

    switch (err.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            status = 400;
            const errors = err.errors.map((e) => e.message);
            message = errors;
            break;
        case "EmailPasswordMissing":
            status = 401
            message = "Email and password cannot be empty"
            break;
        case "InvalidCredentials":
            status = 401
            message = "Login or password is invalid"
            break;
        case "PostNotFound":
            status = 404
            message = "Post cannot be found"
            break;
        case "CategoryNotFound":
            status = 404
            message = "Category cannot be found"
            break;
        case "NotAuthorized":
            status = 403
            message = "You are not authorized"
            break;
        case "InvalidToken":
            status = 401
            message = "Your token is invalid"
            break;
        case "TokenMissing":
            status = 401
            message = "Unauthenticated, please login"
            break;
        case "UserAlreadyRegistered":
            status = 400
            message = "User with that email is already registered"
            break;
      } 

    res.status(status).json({ message: message });

}

module.exports = errorHandler