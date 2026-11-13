const SendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name) {
      return res.status();
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
