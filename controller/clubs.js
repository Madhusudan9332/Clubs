const { clubModel, clubScrapper } = require("../model/clubs");

const scrapClubsData = async (req, res) => {
  const data = await clubScrapper();
  if (!data)
    return res.json({
      status: 404,
      message: "Data Not Found tO Scrap",
    });
  clubModel.create(data);
  res.json({
    status: 202,
    data: data,
  });
};
const postClubsData = (req, res) => {
  const data = req.body;
  if (data)
    res.json({
      status: 202,
      data: data,
    });
};
const getClubsData = (req, res) => {
  const data = clubModel.find();
  if (data) res.render(clubs, { data: data });
  else
    res.json({
      status: 404,
      message: "Data Not Found",
    })
};
const getClubData = (req, res) => {
  const data = clubModel.findById(req.params.ClubId);
  if (data)
    res.json({
      status: 202,
      data: data,
    });
};

const clubsController = {
  scrapClubsData,
  postClubsData,
  getClubsData,
  getClubData,
};
module.exports = clubsController;
