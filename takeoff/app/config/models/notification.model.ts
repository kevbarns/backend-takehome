import { Document, model, Model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface NotificationAttrs {
  uid: string;
  timeZone: string;
  scheduledDate: string;
}

export interface NotificationModel extends Model<NotificationDocument> {
  addOne(doc: NotificationAttrs): NotificationDocument;
}
export interface NotificationDocument extends Document {
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export const NotificationSchema: Schema = new Schema(
  {
    uid: {
      type: String,
      default: uuidv4(),
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

NotificationSchema.statics.addOne = (doc: NotificationAttrs) => {
  return new Notification(doc);
};

export const Notification = model<NotificationDocument, NotificationModel>(
  "Notification",
  NotificationSchema
);
