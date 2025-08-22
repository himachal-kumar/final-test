import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Please provide the campaign ID'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user ID'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide the donation amount'],
    },
    payment_id: {
      type: String,
      required: [true, 'Please provide the payment ID'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema);