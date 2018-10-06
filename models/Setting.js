const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SettingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  general: {
    themeColor: {
      type: String,
      default: "red"
    }
  },
  devices: [
    {
      token: {
        type: String
      },
      name: {
        type: String
      }
    }
  ]
});

module.exports = Setting = mongoose.model("setting", SettingSchema);
