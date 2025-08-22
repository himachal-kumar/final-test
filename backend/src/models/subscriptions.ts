import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // reference to users collection
    ref: "User",
    required: true
  },
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId, // reference to campaigns collection
    ref: "Campaign",
    required: true
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId, // reference to funding_plans collection
    ref: "FundingPlan",
    required: true
  },
  ps_customer_id: {
    type: String, // payment provider customer id
    required: true
  },
  ps_subscription_id: {
    type: String, // provider subscription id
    required: true
  },
  next_billing_date: {
    type: Date, // equivalent to DATE in SQL
    required: true
  },
  status: {
    type: String,
    enum: ["active", "canceled", "past_due", "completed"],
    default: "active"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Subscription= mongoose.model("Subscription", subscriptionSchema);

export default Subscription;