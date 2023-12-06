import { Schema, model } from "mongoose";

const auditTrailSchema = new Schema(
    {
        start_date: {
            type: String,
            trim: true
        },
        end_date: {
            type: String,
            trim: true
        },
        cec_id: {
            type: String,
            trim: true
        },
        jira_id: {
            type: String,
            trim: true
        },
        pid: {
            type: String,
            trim: true
        },
        project_name: {
            type: String,
            trim: true
        },
        // teach_area: {
        //     type: String,
        //     trim: true
        // },
        action: {
            type: String,
            trim: true
        },
        sub_action: {
            type: String,
            trim: true
        },
        // tid: {
        //     type: String,
        //     trim: true
        // },
        total_allocation: {
            type: Number
        },
        old_value: {
            type: String
        },
        new_value: {
            type: String
        },
        new_value_id: { 
            type: String 
        },
        old_value_id: { 
            type: String 
        },
        user_pin_or_org: {
            type: String,
            trim: true
        },
        user_pin_or_org_type: {
            type: String,
            trim: true
        },
        updated_by_pin_or_org: {
            type: String,
            trim: true
        },
        updated_by_pin_or_org_type: {
            type: String,
            trim: true
        },
        updated_by: {
            type: String,
            trim: true
        },
        updated_on: {
            type: Date,
        }
    }
    // { timestamps: true }
);

export default model("schema_demo", auditTrailSchema, "schema_demo");