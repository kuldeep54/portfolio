// import { NextRequest, NextResponse } from 'next/server'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(request: NextRequest) {
//   try {
//     const { name, email, message } = await request.json()

//     // Validate required fields
//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: 'All fields are required' },
//         { status: 400 }
//       )
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { error: 'Invalid email format' },
//         { status: 400 }
//       )
//     }

//     // Send email to you (notification)
//     await resend.emails.send({
//       from: 'Portfolio Contact <onboarding@resend.dev>',
//       to: ['malviyakuldeep54@gmail.com'],
//       subject: `New Contact Form Message from ${name}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
//           <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Message:</strong></p>
//             <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
//               ${message.replace(/\n/g, '<br>')}
//             </div>
//           </div>
//           <p style="color: #64748b; font-size: 14px;">
//             This message was sent from your portfolio contact form.
//           </p>
//         </div>
//       `,
//     })

//     // Send auto-reply to sender
//     await resend.emails.send({
//       from: 'Kuldeep Malviya <onboarding@resend.dev>',
//       to: [email],
//       subject: 'Thank you for contacting me!',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #3b82f6;">Thank You for Your Message!</h2>
//           <p>Hi ${name},</p>
//           <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
//           <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <p><strong>Your message:</strong></p>
//             <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
//               ${message.replace(/\n/g, '<br>')}
//             </div>
//           </div>
//           <p>Best regards,<br><strong>Kuldeep Malviya</strong><br>Full-Stack Developer</p>
//           <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
//           <p style="color: #64748b; font-size: 14px;">
//             You can also reach me directly at: malviyakuldeep54@gmail.com
//           </p>
//         </div>
//       `,
//     })

//     return NextResponse.json(
//       { message: 'Message sent successfully!' },
//       { status: 200 }
//     )

//   } catch (error) {
//     console.error('Contact form error:', error)
//     return NextResponse.json(
//       { error: 'Failed to send message. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send notification email to you
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['malviyakuldeep54@gmail.com'],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Auto reply to sender
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting me!',
      html: `
        <h2>Thank you!</h2>
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I have received your message:</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>I will get back to you soon.</p>
        <br>
        <p>– Kuldeep Malviya</p>
      `,
    })

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
