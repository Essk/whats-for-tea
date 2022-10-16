# What's for Tea?

## A meal planner to help answer the eternal question.

## Current status

* VERY early development

* Not much is implemented and whatever _is_ implemented, probably doesn't work very well.
* As this is a a toy project in early development with requirements largely undefined and no roadmap to speak of, external contributions are likely to be rejected.
* The app will eventually incorporate an Express server and web interface, but it's intended to run on a local network. I'd strongly caution against giving this a live IP address _ever_.

## Data interface

* Mongoose against a remote DB. I am using the free teir of Atlas during developement and the mongoose connection reads in connection info from `/db-connect/connect.json`. There is an example of the format in `/db-connect/connect.example.json`

## Adding data
You add data directly into the DB using the atlas interface or (in progress) I am adding CLI handlers as npm scripts to make that a little easier before getting Express and form handling implemented.

### Measurements
* `npm run setup:measurements --mode=common`
    * adds `grams`, `kilograms`, `millilitres`, `litres`, `teaspoons`, `tablespoons` and `each` as measurements.
* `npm run setup:measurements` with the following arguments to add a custom measurement
    * `unitName` (required) - is used to look up  related units so should be unique
    * `notationSingular` (required) - e.g. "tsp"
    * `notationPlural` (required) - e.g. "tsps"
    * `parentMeasure` (optional) - Will be used to convert smaller units to larger ones. provide the `unitName` of the measurement that this will change to once a threshold amount is reached
    * `parentThreshold` (optional) - Will be used to convert smaller units to larger ones. e.g. `grams` has a `parentThreshold` of 1000, any amount over 1000 will be converted to kilograms in app views.