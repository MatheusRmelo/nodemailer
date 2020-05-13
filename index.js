const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mailer = require('nodemailer')

const config = {
    host: 'smtp.mailtrap.io',
    port: 25,
    secure: false,
    auth: {
        user: 'd5145fe0c5957e',
        pass: 'b88ce34fc3382c'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
}

const transporter = mailer.createTransport(config)

app.use(cors())
app.use(bodyParser.json())

app.post('/send-email', (req, res) => {
    const message = {
        from: "matheusroberttjmelo@gmail.com",
        to: "matheusroberttjmelo@gmail.com",
        subject: 'Contato Jobin Softwares',
        text: `Nome: ${req.body.name} 
               E-mail: ${req.body.email}
               Telefone: ${req.body.telefone}
               Mensagem: ${req.body.message} `
    }

    transporter.sendMail(message, (error, info) => {
        if(error){
            return res.status(400).send(info)
        }
        return res.status(200).send('E-mail enviado com sucesso!')
    })
   
})
app.get('/users', (req, res)=>{
    res.status(200).send('Entrou')
})

app.listen(3333, () => {
    console.log('Servidor executando na porta 3333')
})