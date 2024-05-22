const mongoose = require('mongoose');

const update = async (Model, req, res) => {
  const { id } = req.params; // Assuming the id is passed as a parameter in the request

  try {
    // Find the client by id and update it with the required fields
    const updatedClient = await Model.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedClient) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Client not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: updatedClient,
      message: 'Client updated successfully',
    });
  } catch (error) {
    console.error('Error updating client:', error);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Internal server error',
    });
  }
};

module.exports = update;

