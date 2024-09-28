// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err); // Log error ke console

    // Mengirim status dan pesan error berdasarkan jenis error
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }

    // Untuk error yang tidak terduga
    return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
