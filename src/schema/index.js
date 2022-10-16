const mongoose = require("mongoose");
const { excludeNullValues } = require("../utils");
const { Schema, ObjectId } = mongoose;

const measurementSchema = new Schema(
  {
    unitName: String,
    notationSingular: String,
    notationPlural: String,
    parentMeasure: ObjectId,
    parentThreshold: Number,
  },
  {
    statics: {
      async findByUnitName(_unitName) {
        const result = await this.findOne({
          unitName: new RegExp(`^${_unitName}$`, "i"),
        }).exec();
        return result;
      },
      async findIdByUnitName(_unitName) {
        const result = await this.findByUnitName(_unitName);
        if (result?._id) {
          return result._id;
        }
        console.warn(`no measurement found matching ${_unitName}`);
        return null;
      },
    },
  }
);

measurementSchema.pre("findOneAndUpdate", function (next) {
  let update = { ...this.getUpdate() };
  excludeNullValues(update);
  this.setUpdate(update);
  next();
});

module.exports = {
  measurementSchema,
};
