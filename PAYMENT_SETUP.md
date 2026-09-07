# Payment QA setup

Agriculture bookings now have a payment layer.

- Without Razorpay credentials, the booking page uses a **safe demo payment** path. It never charges money and leaves the booking pending for staff confirmation.
- For real Razorpay **Test Mode**, create a Razorpay test account and add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` as Supabase Edge Function secrets.
- Put the Razorpay test key ID into `book.html` as `window.RAZORPAY_KEY_ID='rzp_test_...'`.
- Never put the Razorpay secret in GitHub or browser code.
- The server-side Edge Functions create and verify orders; the database stores the order/payment IDs and paid status.

Required Edge Functions:
- `create-razorpay-order-v2`
- `verify-razorpay-payment`

The Supabase project already contains the Razorpay booking fields and server-side amount trigger.
