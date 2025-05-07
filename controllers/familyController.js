const FamilyMember = require("../models/FamilyMember");
const User = require("../models/User");

exports.addFamilyMember = async (req, res) => {
  try {
    const { name, email, phone, aadhar, bloodGroup, dob, relation } = req.body;

    // Ensure parent is linked correctly
    const newMember = new FamilyMember({
      parent: req.user._id,  // Ensure this points to the logged-in user (parent)
      name,
      email,
      phone,
      aadhar,
      bloodGroup,
      dob,
      relation,
    });

    // Save the family member
    const savedMember = await newMember.save();

    // Add the new family member's _id to the parent's children array
    const parent = await User.findById(req.user._id);
    if (!parent) {
      return res.status(404).json({ error: "Parent user not found" });
    }

    parent.children.push(savedMember._id);
    await parent.save();

    res.status(201).json({ message: "Family member added", data: savedMember });
  } catch (error) {
    console.error("Error adding family member:", error);  // Log error for debugging
    res.status(500).json({ error: "Error adding member", details: error.message });
  }
};


exports.getFamilyMembers = async (req, res) => {
  try {
    const members = await FamilyMember.find({ parent: req.user._id });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to get family members" });
  }
};

exports.updateFamilyMember = async (req, res) => {
  try {
    const updated = await FamilyMember.findOneAndUpdate(
      { _id: req.params.id, parent: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

exports.deleteFamilyMember = async (req, res) => {
  try {
    const deleted = await FamilyMember.findOneAndDelete({
      _id: req.params.id,
      parent: req.user._id,
    });
    if (!deleted) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};
