// lib/notifications.ts

// Stub: Send email ticket confirmation
export async function sendTicketEmail({ to, name, event, ticketId }: { to: string; name: string; event: any; ticketId: string }) {
  // TODO: Integrate with SMTP2GO or other email provider
  // Example: send email with event details and ticketId
  console.log(`Send email to ${to} for event ${event.name} with ticket ${ticketId}`);
}

// Stub: Send WhatsApp ticket confirmation
export async function sendTicketWhatsApp({ to, name, event, ticketId }: { to: string; name: string; event: any; ticketId: string }) {
  // TODO: Integrate with WhatsApp Cloud API
  // Example: send WhatsApp message with event details and ticketId
  console.log(`Send WhatsApp to ${to} for event ${event.name} with ticket ${ticketId}`);
}

// Wrapper for email notification
export async function sendEmailConfirmation(registration: any, event: any) {
  await sendTicketEmail({
    to: registration.email,
    name: registration.name,
    event,
    ticketId: registration.ticket_id,
  });
}

// Wrapper for WhatsApp notification
export async function sendWhatsAppConfirmation(registration: any, event: any) {
  await sendTicketWhatsApp({
    to: registration.phone,
    name: registration.name,
    event,
    ticketId: registration.ticket_id,
  });
}

// Send both email and WhatsApp notifications after registration
export async function sendRegistrationNotifications(registration: any, event: any) {
  // TODO: Integrate with real email/WhatsApp APIs
  await sendEmailConfirmation(registration, event);
  await sendWhatsAppConfirmation(registration, event);
}

// Notify all registrants of a deleted event
export async function notifyRegistrantsOfDeletedEvent(event: any, registrants: any[]) {
  for (const reg of registrants) {
    // You can customize the message here
    await sendEmailConfirmation(reg, event);
    await sendWhatsAppConfirmation(reg, event);
  }
} 