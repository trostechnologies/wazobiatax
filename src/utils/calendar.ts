/**
 * Generates a downloadable .ics (iCalendar) file so deadlines can be added to Google
 * Calendar, Apple Calendar, Outlook, etc. via the OS's native "import calendar" flow.
 * No Google OAuth/API credentials are required for this approach.
 */

export interface CalendarEvent {
  title: string;
  description?: string;
  date: Date;
}

function toIcsDate(date: Date): string {
  // Use local date components, not toISOString() (which converts to UTC and can
  // shift the date by a day depending on the viewer's timezone offset).
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function toIcsUtcTimestamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function nextDay(date: Date): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  return next;
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

export function downloadIcsFile(filename: string, events: CalendarEvent[]) {
  const now = toIcsUtcTimestamp(new Date());

  const veventBlocks = events.map((event, index) => {
    const start = toIcsDate(event.date);
    const end = toIcsDate(nextDay(event.date));
    return [
      'BEGIN:VEVENT',
      `UID:wazobiatax-deadline-${index}-${start}@wazobiatax.ng`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${escapeIcsText(event.title)}`,
      event.description ? `DESCRIPTION:${escapeIcsText(event.description)}` : '',
      'END:VEVENT',
    ].filter(Boolean).join('\r\n');
  });

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WazobiaTax//Deadlines//EN',
    'CALSCALE:GREGORIAN',
    ...veventBlocks,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
