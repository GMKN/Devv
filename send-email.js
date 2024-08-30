const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    console.log('Received event:', JSON.stringify(event)); // Log the entire event

    if (event.httpMethod === 'POST') {
        try {
            // Log the raw body data
            const body = JSON.parse(event.body);
            console.log('Parsed body:', body);

            const { name, regNumber, fileName, fileContent } = body;

            // Create Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '2ndyearaids@gmail.com',
                    pass: 'pbcsonugbaomgikp' // Use app-specific password or OAuth
                }
            });

            // Set up email options
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

            // Send email
            await transporter.sendMail(mailOptions);

            console.log('Email sent successfully');

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Email sent successfully!' })
            };
        } catch (error) {
            console.error('Error sending email:', error); // Log errors
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
