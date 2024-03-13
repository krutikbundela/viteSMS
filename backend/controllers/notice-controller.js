const Notice = require("../models/noticeSchema.js");

const noticeCreate = async (req, res) => {
  try {
    const notice = new Notice({
      ...req.body,
      school: req.body.adminID,
    });
    const result = await notice.save();
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleNotice = async (req, res) => {
  try {
    const result = await Notice.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).json(err);
  }
};

const noticeList = async (req, res) => {
  try {
    let notices = await Notice.find({ school: req.params.id });
    if (notices.length > 0) {
      res.send(notices);
    } else {
      res.send({ message: "No notices found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { $set: req.body }, // Update with the request body
      { new: true }
    );
    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.send({ success:true , data: updatedNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const result = await Notice.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteAllNotices = async (req, res) => {
  try {
    const result = await Notice.deleteMany({ school: req.params.userid });
    if (result.deletedCount === 0) {
      res.send({ message: "No notices found to delete" });
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = {
  noticeCreate,
  noticeList,
  updateNotice,
  deleteNotice,
  deleteAllNotices,
  getSingleNotice,
};
