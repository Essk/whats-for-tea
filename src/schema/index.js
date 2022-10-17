const mongoose = require("mongoose");
const { excludeNullValues } = require("../utils");
const { Schema, ObjectId } = mongoose;

const equipmentItemSchema = new Schema(
  {
    name: String,
  },
  {
    statics: {
      async findByName(_name) {
        const result = await this.findOne({
          name: new RegExp(`^${_name}$`, "i"),
        }).exec();
        return result;
      },
      async findIdByName(_name) {
        const result = await this.findByName(_name);
        if (result?._id) {
          return result._id;
        }
        console.warn(`no equipment found matching ${_name}`);
        return null;
      },
    },
  }
);

const ingredientSchema = new Schema(
  {
    name: String,
  },
  {
    statics: {
      async findByName(_name) {
        const result = await this.findOne({
          name: new RegExp(`^${_name}$`, "i"),
        }).exec();
        return result;
      },
      async findIdByName(_name) {
        const result = await this.findByName(_name);
        if (result?._id) {
          return result._id;
        }
        console.warn(`no ingredient found matching ${_name}`);
        return null;
      },
    },
  }
);

const mealPartSchema = new Schema({
  name: String,
  method: [
    {
      stepText: String,
      beforeStart: Boolean,
      beforeServe: Boolean,
    },
  ],
  duration: Number,
  recipeIngredients: [
    {
      ingredient: ObjectId,
      measurement: ObjectId,
      amount: Number,
    },
  ],
  equipment: [ObjectId],
});

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
  equipmentItemSchema,
  ingredientSchema,
  measurementSchema,
  mealPartSchema,
};
