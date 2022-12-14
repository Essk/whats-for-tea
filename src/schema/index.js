const mongoose = require("mongoose");
const { excludeNullValues } = require("../utils");
const { Schema, ObjectId } = mongoose;
const slug = require("slug");

const equipmentItemSchema = new Schema(
  {
    slug: String,
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
    slug: String,
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

const mealPartSchema = new Schema(
  {
    slug: String,
    name: String,
    method: [
      {
        stepIndex: Number,
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
        const result = await this.findByUnitName(_name);
        if (result?._id) {
          return result._id;
        }
        console.warn(`no meal part found matching ${_name}`);
        return null;
      },
    },
  }
);

const measurementSchema = new Schema(
  {
    slug: String,
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

equipmentItemSchema.pre("findOneAndUpdate", function (next) {
  let update = { ...this.getUpdate() };
  if (update?.slug) {
    next();
  }
  update.slug = slug(update.name);
  this.setUpdate(update);
  next();
});

ingredientSchema.pre("findOneAndUpdate", function (next) {
  let update = { ...this.getUpdate() };
  if (update?.slug) {
    next();
  }
  update.slug = slug(update.name);
  this.setUpdate(update);
  next();
});

mealPartSchema.pre("findOneAndUpdate", function (next) {
  let update = { ...this.getUpdate() };
  if (update?.slug) {
    next();
  }
  update.slug = slug(update.name);
  this.setUpdate(update);
  next();
});

measurementSchema.pre("findOneAndUpdate", function (next) {
  let update = { ...this.getUpdate() };
  if (update?.slug) {
    next();
  }
  update.slug = slug(update.unitName);
  this.setUpdate(update);
  next();
});

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
