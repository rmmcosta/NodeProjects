const nodemailer = require('nodemailer');
const transport = require('nodemailer-smtp-transport');

function sendEmail(){
    const transporter = nodemailer.createTransport(transport({
        service: 'gmail',
        auth: {
            user: 'cenas@gmail.com',
            pass: 'the pass'
        }
    }));
    let email = '<p>Hi, my name is <b>Ricardo</b>';
    const mailOptions = {
        from: 'cenas@gmail.com',
        to: 'coiso@outsystems.com',
        subject: 'Contact Ricardo',
        html: email
    }
    transporter.verify(function(error,success){
        if(error){
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
            transporter.sendMail(mailOptions,function(error,info){
                if(error){
                    console.log(error);
                } else {
                    console.log(`Message sent: ${info.response}`);
                }
            });
        }
    });
}

sendEmail();

//In order for this to work you need to got to https://myaccount.google.com/lesssecureapps
//and change the user and pass for the email that you want 