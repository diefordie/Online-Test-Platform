const errorHandler = (err, req, res, next) => {
    console.error(err); 

    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
