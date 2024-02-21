const Grievance = require('../models/grievance');

const raiseGrievance = async (req, res) => {
  try {
    const { description } = req.body;
    const newGrievance = new Grievance({ employeeId: req.userId, description });
    await newGrievance.save();

    res.status(201).json({ message: 'Grievance raised successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const resolveGrievance = async (req, res) => {
  try {
    const grievanceId = req.params.id;
    const updatedGrievance = await Grievance.findByIdAndUpdate(
      grievanceId,
      { status: 'resolved' },
      { new: true }
    );

    if (!updatedGrievance) {
      return res.status(404).json({ error: 'Grievance not found' });
    }

    res.status(200).json({ message: 'Grievance resolved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { raiseGrievance, resolveGrievance };
