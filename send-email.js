const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            const { name, regNumber, fileName, fileContent } = JSON.parse(event.body);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '2ndyearaids@gmail.com',
                    pass: 'pbcsonugbaomgikp' // Replace with your app password
                }
            });

            const mailOptions = {
                from: '2ndyearaids@gmail.com',
                to: 'gmars.gmr@gmail.com',
                subject: `Document Upload: ${name} - ${regNumber}`,
                text: `Name: ${name}\nRegister Number: ${regNumber}`,
                attachments: [
                    {
                        filename: fileName,
                        content: Buffer.from(fileContent, 'base64')
                    }
                ]
            };

            await transporter.sendMail(mailOptions);

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Email sent successfully!' })
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to send email.' })
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};
