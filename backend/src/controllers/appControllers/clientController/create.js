const mongoose = require('mongoose');
const People = mongoose.model('People');
const Company = mongoose.model('Company');

const create = async (Model, req, res) => {
  try {
    // Validate required fields
    if (!req.body.type) {
      return res.status(400).json({
        success: false,
        message: 'Type is required',
      });
    }

    if (req.body.type === 'people') {
      if (!req.body.people) {
        return res.status(400).json({
          success: false,
          message: 'People is required',
        });
      }

      // Check if people exists and update related document
      let people = await People.findOneAndUpdate(
        {
          _id: req.body.people,
          removed: false,
        },
        { isClient: true },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!people) {
        return res.status(404).json({
          success: false,
          message: 'People not found',
        });
      }

      req.body.name = `${people.firstname} ${people.lastname}`;
      req.body.company = undefined;
    } else if (req.body.type === 'company') {
      if (!req.body.company) {
        return res.status(400).json({
          success: false,
          message: 'Company is required',
        });
      }

      // Check if company exists and update related document
      let company = await Company.findOneAndUpdate(
        {
          _id: req.body.company,
          removed: false,
        },
        { isClient: true },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!company) {
        return res.status(404).json({
          success: false,
          message: 'Company not found',
        });
      }

      req.body.name = company.name;
      req.body.people = undefined;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid type',
      });
    }

    if (!req.body.address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required',
      });
    }

    req.body.address = req.body.address;

    // Save the document
    const result = await new Model(req.body).save();

    // Returning successful response
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully created the document in Model',
    });
  } catch (error) {
    console.error('Error creating document:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = create;

