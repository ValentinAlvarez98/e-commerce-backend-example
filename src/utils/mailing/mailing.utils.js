import nodemailer from 'nodemailer';
import CONFIG from '../../environments/config.js';

const MAIL = {
      user: CONFIG.MAIL.user,
      pass: CONFIG.MAIL.password
};

const URL = CONFIG.API_URL;

const TRANSPORTER = nodemailer.createTransport({

      service: 'gmail',
      port: 587,
      auth: {
            user: MAIL.user,
            pass: MAIL.pass
      }

});

export async function sendErrorDBEmail(subject, text, emails) {

      try {

            await TRANSPORTER.sendMail({
                  from: MAIL.user,
                  to: emails,
                  subject: subject,
                  text: text
            })

            console.log("Email enviado exitosamente");

      } catch (error) {

            console.error("Error al enviar el email", error);

      }

}

export async function sendInactiveEmail(emails) {

      const HTML = `
      <h1>Tu cuenta ha sido eliminada por inactividad</h1>
      <div>
              <h2>Gracias por haberte registrado</h2>
      </div>
      <div>
                  <p>Esperamos que vuelvas pronto</p>
      </div>

      <div>
                        <p>Saludos</p>
      </div>

      <div>

                        <h3> Como siempre, gracias por confiar en nosotros</h3>
      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: emails,
            subject: 'Adios',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });


}

export async function sendWelcomeEmail(email, userName) {

      const HTML = `<div style = "max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" >
            <div style = "background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;" >
            <h1> Bienvenido a EasyClick </h1>
            </div> <div style = "padding: 20px;" >
            <p> Estimado ${userName}, </p> <p> ¡Estamos encantados de darte la bienvenida a EasyClick!Aquí encontrarás una amplia variedad de muebles de encastre para tu hogar, tu mascota y para exhibir tus productos favoritos, todos hechos con amor y madera reciclada. </p> <p> Nuestra misión es ofrecerte soluciones prácticas, sostenibles y de diseño que no solo embellezcan tu espacio, sino que también cuiden de nuestro planeta. </p> <a href = "https://test-deploy-front-seven.vercel.app/#/"
      style = "display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 10px 15px; text-decoration: none; border-radius: 5px; margin-top: 15px;" > Explora Nuestra Colección </a> <p> Si tienes preguntas o necesitas asistencia, no dudes en responder este correo o visitar nuestra sección de contacto en nuestra página web. </p> <p> Gracias por elegir sostenibilidad, El Equipo de EasyClick </p> </div> <div style = "background-color: #eee; padding: 10px 20px; text-align: center; font-size: 12px;" >
            <p> Síguenos en nuestras redes sociales para estar al día con las últimas novedades y ofertas. </p> </div> </div>`;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: `Bienvenido ${userName}`,
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}

export async function sendWholeSaleEmail(email, name, consult) {


      const HTML = `
      <h1>Nueva solicitud de información de venta al por mayor</h1>
      <div>
              <h2>El usuario ${name} ha solicitado información sobre la venta al por mayor</h2>
      </div>

      <div>
                  <p>El usuario ha dejado el siguiente mensaje:</p>
      </div>

      <div>

                  <p>${consult}</p>

      </div>

      <div>
                  <p> Comunicarse con el usuario al siguiente correo: ${email}</p>

      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: CONFIG.ADMIN.email,
            subject: `Nueva solicitud de información de venta al por mayor`,
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });
}

export async function sendGoodbyeEmail(email) {

      const HTML = `
      <h1>Adios</h1>
      <div>
          <h2>Gracias por haberte registrado</h2>
      </div>
      <div>
              <p>Esperamos que vuelvas pronto</p>
      </div>

      <div>
                  <p>Saludos</p>
      </div>

      <div>
                  <h3> Como siempre, gracias por confiar en nosotros</h3>
      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Adios',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}



export async function sendResetPassword(email, token) {

      const now = new Date();

      const createdAt = now.toISOString();

      const HTML = `
      <h1>Recuperar contraseña</h1>
      <div>
          <h2>Para recuperar tu contraseña, ingresa al siguiente enlace</h2>
      </div>
      <div>
          <h3>(El enlace expira en 1 hora y en caso de que haya expirado, se te redirigirá a la página de recuperación de contraseña para solicitar uno nuevo)</h3>
      </div>
      <div>
              <p>${URL}/resetPassword?token=${token}&createdAt=${createdAt}</p>
      </div>

      <div>
                  <p>Saludos</p>
      </div>

      <div>
                  <h3> Como siempre, gracias por confiar en nosotros</h3>
      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Recuperar contraseña',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}

export async function sendResetPasswordConfirmation(email) {

      const HTML = `
            <h1>Recuperar contraseña</h1>
            <div>
            <h2>Se ha cambiado tu contraseña</h2>
            </div>
            <div>
                  <p>Ya puedes ingresar con tu nueva contraseña</p>
            </div>
      
            <div>
                        <p>Saludos</p>
            </div>
      
            <div>
                        <h3> Como siempre, gracias por confiar en nosotros</h3>
            </div>
      
            `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Recuperar contraseña',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}

export async function sendDeletedProductEmail(email, product) {

      const HTML = `
      <h1>Producto eliminado</h1>
      <div>
          <h2>El producto ${product.title} ha sido eliminado</h2>
      </div>
      <div>
              <p>El producto ya no esta disponible para la venta</p>
      </div>

      <div>
                  <p>Saludos</p>
      </div>

      <div>
                  <h3> Como siempre, gracias por confiar en nosotros</h3>
      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Producto eliminado',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}