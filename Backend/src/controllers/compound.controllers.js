const { Compound } = require('../models/index.js');

const getAllCompounds = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const compounds = await Compound.findAndCountAll({ limit, offset });
    res.status(200).json({
      totalItems: compounds.count,
      compounds: compounds.rows,
      totalPages: Math.ceil(compounds.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching compounds' });
  }
};

const getCompoundById = async (req, res) => {
  const compoundId = req.params.id;

  try {
    const compound = await Compound.findByPk(compoundId);
    if (compound) {
      res.status(200).json(compound);
    } else {
      res.status(404).json({ error: 'Compound not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching compound details' });
  }
};

const updateCompound = async (req, res) => {
  const compoundId = req.params.id;
  const { name, description, image, imageAttribution, dateModified } = req.body;

  try {
    const compound = await Compound.findByPk(compoundId);
    if (compound) {
      await compound.update({
        name: name || compound.name,
        description: description || compound.description,
        image: image || compound.image,
        imageAttribution: imageAttribution || compound.imageAttribution,
        dateModified: dateModified || compound.dateModified,
      });
      res.status(200).json({ message: 'Compound updated successfully' });
    } else {
      res.status(404).json({ error: 'Compound not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating compound' });
  }
};

module.exports = { getAllCompounds, getCompoundById, updateCompound };