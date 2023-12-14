const nodemailer = require('nodemailer');
const express = require('express');
const app = express();


export default async (req, context) => {
    console.log("DENTRO!")

    const contenido = await req.json();
    console.log(contenido)
    
    email = contenido['email'];
    console.log(email);

    try {
        // Set up transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unitimecontactapp@gmail.com',
                pass: 'yyoo crzb ckji mwfk' // Be cautious with storing passwords in code
            }
        });

        // Email content
        const mailOptions = {
            from: 'unitimecontactapp@gmail.com',
            to: email,
            subject: 'Recuperacion de cuenta',
            text: 'Para recuperar la cuenta responda a este correo'
        };

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        return { status: "success" };
    } catch (error) {
        console.error('Error sending email:', error);
        return { status: "failure", error: error };
    }
}