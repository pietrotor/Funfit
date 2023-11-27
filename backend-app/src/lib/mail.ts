// import * as nodeMailer from 'nodemailer'
// import configData from '../config'

// export interface MessageInfo {
//     name: string;
//     // eslint-disable-next-line camelcase
//     last_name?: string;
//     email: string;
//     subject: string;
//     message: string;
//     phone?: string;
//     country?: string;
//     formType?: string
// }
// export const sendMail = async (to:[string], subject:string, infoMail: MessageInfo) => {
//   const transporter = nodeMailer.createTransport(configData.dataMail.auth)
//   const body = infoMail.formType
//     ? fillClaimOrOpinionOrContactMail(infoMail.name, infoMail.email, infoMail.subject, infoMail.message, infoMail.formType, infoMail.formType === 'contacto' ? infoMail.country : undefined)
//     : fillServiceMail(infoMail.name, infoMail.last_name!, infoMail.email, infoMail.message, infoMail.phone!, infoMail.country!)
//   await transporter.sendMail({
//     from: configData.dataMail.remitente, // sender address
//     to: to.join(', '), // list of receivers
//     subject: subject, // Subject line
//     html: body // html body
//   })
// }

// const fillClaimOrOpinionOrContactMail = (name:string, email:string, subject: string, message: string, formType: string = 'reclamo', country?: string) => {
//   let completeMailBody = initEmailTemplate
//   const bodyMail = `
//                 <p>Hola, </p>
//                 <p>En el formulario de ${formType} de la página web http://imocert.bio, dejaron el siguiente mensaje: </p>
//                 <ol>
//                   <li>Nombre: ${name}</li>
//                   <li>Correo: ${email}</li>
//                   <li>Asunto: ${subject}</li>
//                   <li>Mensaje: ${message}</li>
//                   ${country ? `<li>País: ${country}</li>` : ''}
//                 </ol>
//                 <p>Saludos</p>
//   `
//   completeMailBody += bodyMail
//   completeMailBody += endEmailTemplate
//   return completeMailBody
// }

// const fillServiceMail = (name:string, lastName: string, email:string, message: string, phone: string, country: string) => {
//   let completeMailBody = initEmailTemplate
//   const bodyMail = `
//                 <p>Hola, </p>
//                 <p>En el formulario de solicitud de servicio de la página web http://imocert.bio, dejaron el siguiente mensaje: </p>
//                 <ol>
//                   <li>Nombre: ${name} ${lastName}</li>
//                   <li>Correo: ${email}</li>
//                   <li>Teléfono: ${phone}</li>
//                   <li>Servicio: ${message}</li>
//                   <li>País: ${country}</li>
//                 </ol>
//                 <p>Saludos</p>
//   `
//   completeMailBody += bodyMail
//   completeMailBody += endEmailTemplate
//   return completeMailBody
// }

// const initEmailTemplate = `<!DOCTYPE html>
// <html lang="en">
// <head>
//         <meta name="viewport" content="width=device-width" />
//         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//         <title>Welcome</title>
//         <style>
//             * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//             }
//             @media(max-width: 768px) {
//                 .container{
//                     width: 100%!important;
//                 }
//             }
//             body{
//                 font-family: Arial, Helvetica, sans-serif;
//             }
//             .container {
//                 margin-top: 1px;
//             }
//             .content {
//                 padding: 5px;
//             }
           
//         </style>
// </head>
// <body>
//     <div class="container">
//         <div class="content">`
// const endEmailTemplate = `</div>
// </div>
// </body>
// </html>`
