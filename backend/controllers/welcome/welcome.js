const welcome = async (req, res) => {
    
    res
    .status(200)
    .json({
        success: true,
        message: "API Called Successfully"
    })
}

module.exports = welcome;