require("dotenv").config()

const { UserInputError } = require("apollo-server-express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const {
    validateRegistration,
    validateLogin,
} = require("../../utils/validators")

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        process.env.jwtSecretKey,
        { expiresIn: "1h" }
    )
}

module.exports = {
    Mutation: {
        register: async (
            _,
            { registerInput: { username, email, password, confirmPassword } },
            context,
            info
        ) => {
            //  Vaidate User Data
            const { isValid, errors } = validateRegistration(
                username,
                email,
                password,
                confirmPassword
            )

            if (!isValid) {
                throw new UserInputError("Errors", { errors })
            }

            // Unique Email and Username
            const foundUsername = await User.findOne({ username })
            const foundEmail = await User.findOne({ email })

            if (foundUsername || foundEmail) {
                throw new UserInputError("Account already exists...", {
                    errors: {
                        username: "Account already exists...",
                    },
                })
            }

            // Hash Password and Create Auth Token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

            const res = await newUser.save()

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token,
            }
        },
        login: async (_, { loginInput: { username, password } }) => {
            const { isValid, errors } = validateLogin(username, password)
            const user = await User.findOne({ username })

            if (!user) {
                errors.login = "User not found..."
                throw new UserInputError("User not found...", { errors })
            }


            const loggedIn = await bcrypt.compare(password, user.password)

            if (!loggedIn) {
                errors.login = "Wrong Credentials..."
                throw new UserInputError("Wrong Credentials...", { errors })
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token,
            }
        },
    },
}
