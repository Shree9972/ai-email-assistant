const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
    
    filename: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    attachmentId: {
      type: String,
      required: true,
    },

    size: Number,

  },

  { _id: false }

);

const emailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    gmailId: {
      type: String,
      required: true,
    },

    threadId: {
      type: String,
      required: true,
      index: true,
    },

    subject: {
      type: String,
      default: "",
    },

    sender: {
      type: String,
      required: true,
    },

    recipients: [
      {
        type: String,
      },
    ],

    body: {
      type: String,
      default: "",
    },

    snippet: {
      type: String,
      default: "",
    },

    receivedAt: {
      type: Date,
      required: true,
    },

    labels: [
      {
        type: String,
      },
    ],

    hasAttachments: {
      type: Boolean,
      default: false,
    },

    attachments: [attachmentSchema],
  },
  {
    timestamps: true,
  }
);

emailSchema.index({ user: 1, gmailId: 1 }, { unique: true });

module.exports = mongoose.model("Email", emailSchema);