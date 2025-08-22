import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true
  },
  amount_cents: {
    type: Number, // store smallest unit (cents/paise)
    required: true
  },
  currency: {
    type: String,
    default: "INR" // or USD, etc.
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  },
  provider_payload: {
    type: Object, // raw JSON from payment gateway (Razorpay/Stripe)
    default: {}
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;