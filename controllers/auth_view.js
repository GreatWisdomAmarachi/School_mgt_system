const User = require('../models/User')
const bcrypt = require('bcryptjs')
const authenticateUser = require('../models/helper/authenticateUser')
const generateToken = require('../models/helper/generateToken')

// Render login page
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        //Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            })
        }
        const user = await authenticateUser(email, password)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        // Generate token
        const token = generateToken(user)

        //set refresh token as httpOnly cookie
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Set to true in development
            sameSite: 'None', // Adjust based on your requirements
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        //return success response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    title: user.title,
                    surname: user.surname,
                    middlename: user.middlename,
                    lastname: user.lastname,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    staffNo: user.staffNo,
                    regNo: user.regNo,
                    address: user.address,
                    phone: user.phone,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token: token.authToken,
                refreshToken: token.refreshToken,
            },
        })
    } catch (error) {
        console.error('Login error:', error)
        return res.status(500).json({
            success: false,
            message: 'internal server error',
        })
    }
}

exports.logout = async (req, res) => {
    try {
        //clear the refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Set to true in development
            sameSite: 'None', // Adjust based on your requirements
        })

        return res.status(200).json({
            success: true,
            message: 'Logout successful',
        })
    } catch (error) {
        console.error('Logout error:', error)
        return res.status(500).json({
            success: false,
            message: 'internal server error',
        })
    }
}