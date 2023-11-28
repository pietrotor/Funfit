// import Emmiter from 'events'
// import { sendMail, MessageInfo } from './mail'
// import db from './prisma'
// let event: Emmiter
// interface ISendMail {
//   to: [string];
//   subject: string;
//   emailInfoInput: MessageInfo;
// }
// export const initEvent = () => {
//   event = new Emmiter()
//   event.on('send-email', async (emailData: ISendMail) => {
//     try {
//       // await sendMail(emailData.to, emailData.subject, emailData.emailInfoInput)
//       // await db.mailMessages.create({
//       //   data: emailData.emailInfoInput
//       // })
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }
// export const getEvent = () => {
//   return event
// }
