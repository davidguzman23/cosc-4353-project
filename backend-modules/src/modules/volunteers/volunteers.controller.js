const volunteers = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

exports.getVolunteers = (req, res) => {
  res.json(volunteers);
};
