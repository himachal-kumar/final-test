import mongoose from "mongoose";

const fundingPlanSchema = new mongoose.Schema({
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount_cents: {
    type: Number,
    required: true,
  },
  interval: {
    type: String,
    enum: ["monthly", "quarterly", "half_year", "yearly"],
    required: true,
  },
  ps_provider_plan_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Safe export to avoid OverwriteModelError
const FundingPlan = mongoose.models.FundingPlan || mongoose.model("FundingPlan", fundingPlanSchema);
export default FundingPlan;
