// validators/compound.validate.js
const { body, param } = require('express-validator');

const allow = ['name', 'description', 'imageSource', 'imageAttribution', 'dateModified'];

exports.updateRules = [
  param('id').isInt({ gt: 0 }),

  // Keep only allowed keys in req.body (ignore others like id, createdAt, etc.)
  body().customSanitizer(b => {
    if (!b || typeof b !== 'object') return {};
    const out = {};
    for (const k of allow) if (b[k] !== undefined) out[k] = b[k];
    return out;
  }),

  // Require at least one allowed field after sanitizing
  body().custom(b => {
    if (!b || Object.keys(b).length === 0)
      throw new Error(`Send at least one of: ${allow.join(', ')}`);
    return true;
  }),

  // Validate only if the field is present & non-empty
  body('name').optional({ checkFalsy: true, nullable: true })
    .isString().trim().isLength({ min: 1, max: 100 }),

  body('description').optional({ checkFalsy: true, nullable: true })
    .isString().trim().isLength({ max: 5000 }),

  body('imageSource').optional({ checkFalsy: true, nullable: true })
    .isURL().isLength({ max: 1000 }),

  body('imageAttribution').optional({ checkFalsy: true, nullable: true })
    .isString().trim().isLength({ max: 1000 }),

  body('dateModified').optional({ checkFalsy: true, nullable: true })
    .isISO8601(),
];
