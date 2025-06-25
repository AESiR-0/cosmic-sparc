import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface PublicEventRegistrationFormProps {
  event: any;
  user: any;
}

export default function PublicEventRegistrationForm({ event, user }: PublicEventRegistrationFormProps) {
  const router = useRouter();
  // Use Record<string, string> for form to support dynamic fields
  const [form, setForm] = useState<Record<string, string>>({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStep, setPaymentStep] = useState(false); // Track if payment step is active
  const [paymentComplete, setPaymentComplete] = useState(false); // Track if payment is done

  // Add dynamic fields from event.form_schema (if present)
  const dynamicFields: any[] = Array.isArray(event?.form_schema) ? event.form_schema : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          userId: user?.id || null,
          name: form.name,
          email: form.email,
          phone: form.phone,
          formData: Object.fromEntries(dynamicFields.map((f: any) => [f.name, form[f.name] || ''])),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      // Redirect to confirmation page
      router.push(`/events/${event.slug}/confirmation/${data.ticketId}`);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep(true);
  };

  // Simulate payment completion (stub)
  const handleSimulatePayment = () => {
    // TODO: Integrate Razorpay or other payment gateway here
    setPaymentComplete(true);
  };

  return (
    <form className="space-y-4" onSubmit={paymentStep && paymentComplete ? handleSubmit : handleProceedToPayment}>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      {/* Render additional fields from event.form_schema if present */}
      {dynamicFields.map((field: any) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-1">{field.label || field.name}</label>
          <input
            name={field.name}
            value={form[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      ))}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {/* Payment Step Stub */}
      {paymentStep && !paymentComplete && (
        <div className="border rounded p-4 bg-yellow-50 text-center">
          <div className="mb-2 font-semibold">Payment Required</div>
          {/* TODO: Integrate Razorpay or other payment gateway here */}
          <button
            type="button"
            className="w-full bg-[#e28618] text-white rounded px-4 py-2 mt-2"
            onClick={handleSimulatePayment}
          >
            Simulate Payment (Stub)
          </button>
        </div>
      )}
      {/* Show Register button only after payment is complete, or if no payment step */}
      {(!paymentStep || paymentComplete) && (
        <Button type="submit" className="w-full bg-[#006D92] hover:bg-[#e28618]" disabled={loading}>
          {loading ? 'Registering...' : paymentStep ? 'Complete Registration' : 'Proceed to Payment'}
        </Button>
      )}
    </form>
  );
} 