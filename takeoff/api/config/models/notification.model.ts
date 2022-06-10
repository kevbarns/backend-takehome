import { Document, model, Model, Schema } from "mongoose";
import { UserTaskData } from "../../../share";

export interface NotificationModel extends Model<NotificationDocument> {
  addOne(doc: UserTaskData): NotificationDocument;
}
export interface NotificationDocument extends Document {
  uid: string;
  timeZone: string;
  scheduledDate: string;
}

export const NotificationSchema: Schema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    timeZone: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.statics.addOne = (doc: UserTaskData) => {
  return new Notification(doc);
};

export const Notification = model<NotificationDocument, NotificationModel>(
  "Notification",
  NotificationSchema
);
