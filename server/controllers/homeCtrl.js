const api_key = '1f394696b3621cf57924139105f507a2-713d4f73-23e14ef8';
const domain = 'sandbox519dfbb42fd6429a990fd4bfe75ba58a.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.home = async (req, res) => {

    res.render('index', {
        pagina: 'Portafolio',
        clase: 'home'
    });
}

exports.enviarEmail = async (req, res) => {
    try {
        const { nombre, apellido, email, text } = req.body;  
        

        contentHTML = `
            <h1>Información</h1>
            <ul>
                <li>Nombre: ${nombre}</li>
                <li>Apellido: ${apellido}</li>
                <li>Correo: ${email}</li>               
            </ul>
            <p><strong>Comentarios: </strong>${text}</p>
        `;

        const data = {
            from: `<${ email }>`,
            to: 'mortizl@unicartagena.edu.co', 
            subject: 'Contacto',    
            html: contentHTML
        };

        mailgun.messages().send(data, function (error, body) {
            if( error ) {
                console.log(error);
            }
            console.log(body);
        });
       
        res.redirect('/#contacto');
    
    } catch (error) {
        console.log(error)
    }

}

