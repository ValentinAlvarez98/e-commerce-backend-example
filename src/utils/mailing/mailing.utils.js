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

export async function sendWelcomeEmail(email) {

      const HTML = `
      <h1>Bienvenido</h1>
      <div>
          <h2>Gracias por registrarte</h2>
      </div>
      <div>
              <p>Ya podes empezar a comprar</p>
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
            subject: 'Bienvenido',
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