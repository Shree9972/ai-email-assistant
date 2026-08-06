const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({

        task: {
            type: String,
            required: true,
        },
        subject: String,
        sender: String,
        deadline: Date,
        priority: {
            type: String,
            enum: ["HIGH", "MEDIUM", "LOW"],
        },
    },

    { _id: false }

);


const replySchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },

        replyType: {
            type: String,
            enum: [
                "QUESTION",
                "REQUEST",
                "CONFIRMATION",
                "APPROVAL",
                "FOLLOW_UP",
            ],
            required: true,
        },

        priority: {
            type: String,
            enum: ["HIGH", "MEDIUM", "LOW"],
            required: true,
        },

        deadline: {
            type: Date,
            default: null,
        },

    },
    { _id: false }
);

const aiAnalysisSchema = new mongoose.Schema(

    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        analysisDate: {
            type: Date,
            required: true,
        },

        summary: {
            type: String,
            default: '',
        },

        tasks : [
            taskSchema
        ],

        replyRequired: [
            replySchema
        ]

    },
    {
        timestamps: true,
    }
);

aiAnalysisSchema.index({ user: 1, analysisDate: 1 }, { unique: true });

const AiAnalysis = mongoose.model('AIAnalysis', aiAnalysisSchema);