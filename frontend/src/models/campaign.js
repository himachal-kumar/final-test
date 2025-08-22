import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    ngo_name: {
      type: String,
      required: [true, 'Please provide the NGO name'],
      maxlength: [100, 'NGO name cannot be more than 100 characters'],
    },
    title: {
      type: String,
      required: [true, 'Please provide the campaign title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide the campaign description'],
    },
    goal_amount: {
      type: Number,
      required: [true, 'Please provide the goal amount'],
    },
    collected_amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
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

export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);