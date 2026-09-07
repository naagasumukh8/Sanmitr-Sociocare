/* Payment QA layer. Uses Razorpay Test Mode when configured; otherwise provides a safe demo-payment path. */
(function () {
  const RAZORPAY_KEY_ID = window.RAZORPAY_KEY_ID || '';
  const EDGE_BASE = 'https://wqospnmxrqvvyfmijonb.supabase.co/functions/v1';
  const getToken = () => localStorage.getItem('sb_access_token') || '';
  const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` });

  async function createBookingAndPay(e) {
    e.preventDefault();
    const msg = document.getElementById('bm');
    msg.textContent = 'Submitting booking…';
    const payload = {
      service_id: document.getElementById('bs').value,
      customer_name: document.getElementById('bn').value.trim(),
      phone: document.getElementById('bp').value.trim(),
      email: document.getElementById('be').value.trim() || null,
      preferred_date: document.getElementById('bd').value,
      location: document.getElementById('bl').value.trim() || null,
      details: document.getElementById('bx').value.trim() || null
    };
    try {
      const created = await api('agriculture_bookings', { method:'POST', headers:{ Prefer:'return=representation' }, body:JSON.stringify(payload) }, '');
      const booking = Array.isArray(created) ? created[0] : created;
      if (!booking?.id) throw new Error('Booking was not created.');
      msg.textContent = 'Booking created. Choose payment mode…';
      showPaymentOptions(booking);
    } catch (err) {
      msg.textContent = err.message || 'Booking failed.';
    }
  }

  function showPaymentOptions(booking) {
    let box = document.getElementById('payment-options');
    if (!box) {
      box = document.createElement('div'); box.id = 'payment-options'; box.className = 'card payment-box';
      document.querySelector('.form')?.appendChild(box);
    }
    box.innerHTML = `<h3>Payment</h3><p class="muted">Booking amount: ₹${Number(booking.amount_inr || 0).toLocaleString('en-IN')}</p>
      <div class="actions"><button type="button" class="btn" id="rzp-pay">${RAZORPAY_KEY_ID ? 'Pay with Razorpay Test Mode' : 'Demo payment (safe test)'}</button></div>
      <p id="pay-msg" class="notice">No real charge is made by the demo path.</p>`;
    document.getElementById('rzp-pay').onclick = () => RAZORPAY_KEY_ID ? payRazorpay(booking) : demoPayment(booking);
  }

  async function demoPayment(booking) {
    document.getElementById('pay-msg').textContent = `Demo payment successful for booking ${booking.id.slice(0,8)}. No money was charged; booking remains pending for staff confirmation.`;
  }

  async function payRazorpay(booking) {
    const pm = document.getElementById('pay-msg'); pm.textContent = 'Opening Razorpay Test Checkout…';
    if (!window.Razorpay) { pm.textContent = 'Razorpay Checkout did not load. Check your network and key configuration.'; return; }
    try {
      const r = await fetch(`${EDGE_BASE}/create-razorpay-order`, { method:'POST', headers:headers(), body:JSON.stringify({ booking_id: booking.id }) });
      const order = await r.json(); if (!r.ok) throw new Error(order.error || 'Could not create Razorpay order.');
      const options = {
        key: RAZORPAY_KEY_ID, amount: order.amount, currency: order.currency || 'INR', name:'Sanmitr Sociocare', description:'Agriculture service booking', order_id:order.id,
        handler: async function (response) {
          const vr = await fetch(`${EDGE_BASE}/verify-razorpay-payment`, { method:'POST', headers:headers(), body:JSON.stringify({ booking_id:booking.id, ...response }) });
          const result = await vr.json(); pm.textContent = vr.ok ? 'Payment verified successfully. Booking is marked paid.' : (result.error || 'Payment verification failed.');
        }, prefill:{ name:booking.customer_name, email:booking.email || '', contact:booking.phone }, theme:{ color:'#1677ff' }
      };
      new Razorpay(options).open();
    } catch (err) { pm.textContent = err.message || 'Payment failed.'; }
  }

  function install() {
    const form = document.querySelector('form.form[onsubmit="startBooking(event)"]');
    if (!form) return;
    form.setAttribute('onsubmit','createBookingAndPay(event)');
    window.createBookingAndPay = createBookingAndPay;
  }
  window.createBookingAndPay = createBookingAndPay;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(install, 50)); else setTimeout(install, 50);
})();
