import mongoose, { Schema, model, models } from "mongoose";

const DonationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    campaign: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
  },
  { timestamps: true }
);

const Donation = models.Donation || model("Donation", DonationSchema);

export default Donation;
