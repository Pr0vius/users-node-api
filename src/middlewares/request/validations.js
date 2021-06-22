const { check, validationResult } = require("express-validator");
const ErrorResponse = require("../../helpers/errorResponse");
const {
    emailExistFunction,
    roleValidFunction,
    idExistFunction
} = require('./customFunctions/index');



const _firstnameRequired = check("firstname", "Firstname is required")
    .not()
    .isEmpty()
;

const _lastnameRequired = check("lastname", "Lastname is required")
    .not()
    .isEmpty()
;

const _emailRequired = check("email", "Email is required")
    .not()
    .isEmpty()
;

const _emailType = check("email", "Must be an email")
    .isEmail()
;

const _emailExist = check('email')
    .custom(emailExistFunction)
;

const _passwordRequired = check("password", "Password is required")
    .not()
    .isEmpty()
;

const _roleValid = check('role')
    .optional()
    .custom(roleValidFunction)
;

const _dateValid = check('birthdate')
    .optional()
    .isDate('MM-DD-YYYY')
;

const _validationResult = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        throw new ErrorResponse(`Validation Error`, 400, err.errors);
    }
    next();
};

const _idRequied = check('id')
    .not()
    .isEmpty()
;

const _idIsMongoDB = check('id')
    .isMongoId()
;

const _idExist = check('id')
    .custom(idExistFunction)
;

const _optionalEmailValid = check('email', 'Email is invalid')
    .optional()
    .isEmail()
;

const _optionalEmailExist = check('email')
    .optional()
    .custom(emailExistFunction)
;


const postValidations = [
    _firstnameRequired,
    _lastnameRequired,
    _emailRequired,
    _emailType,
    _emailExist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    _validationResult,
];

const putValidations = [
    _idRequied,
    _idIsMongoDB,
    _idExist,
    _roleValid,
    _dateValid,
    _optionalEmailValid,
    _optionalEmailExist,
    _validationResult
]
module.exports = {
    postValidations,
    putValidations
};