// models/order.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;        // reference to User
  campaign: mongoose.Types.ObjectId;    // reference to Campaign
  fundingPlan: mongoose.Types.ObjectId; // reference to FundingPlan
  amount: number;                       // total amount paid
  status: "pending" | "paid" | "failed"; // payment status
  paymentId?: string;                   // Razorpay / Stripe / custom payment id
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    campaign: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
    fundingPlan: { type: Schema.Types.ObjectId, ref: "FundingPlan", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
