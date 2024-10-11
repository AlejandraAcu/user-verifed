const EmailCode = require('../models/EmailCode')
const { sendEmail } = require('../utils/sendEmail')

async function emailCode(req, res, next) {

    const code = require('crypto').randomBytes(64).toString('hex')

    const { id, email, firstName } = req.result

    const userId = id

    const body = { code, userId }

    const userCode = await EmailCode.create(body)
    if (!userCode) return res.sendStatus(400)
        
    sendEmail({
        to: email,
        subject: 'test',
        html: `
            <div>
                <h1>Hola ${firstName}</h1>
                <p> y tu codigo para verificar la cuenta es ${code}
            </div>
        `
    })
    return res.status(201).json('User Created')
}
module.exports = emailCode