const Book = require('../model/Book')

//GET ALL BOOKS
const getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find();
    }
    catch (err) {
        console.log(err)
    }
    if (!books) {
        return res.status(404).json({ message: "No products found!" })
    }
    return res.status(201).json({ books })
}

//GET A BOOK
const getById = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findById(id);
    }
    catch (err) {
        console.group(err);
    }
    if (!book) {
        return res.status(403).json({ message: "Book not found" })
    }
    return res.status(201).json({ book })
}

//ADD BOOK
const addBook = async (req, res, next) => {
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
        book = new Book({
            name,
            author,
            description,
            price,
            available,
            image
        });
        await book.save();
    }
    catch (err) {
        return res.status(403).send('didnt add')
    }

    if (!book) {
        return res.status(500).json({ message: 'Unable to add' })
    }
    return res.status(201).json({ message: 'Added succesfully' })
}

//UPDATE
const updatebook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image
        })
        book = await book.save()
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(500).json({ message: 'Unable to update' })
    }
    return res.status(201).json({ message: 'Updated succesfully' })
}

//DELETE
const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id);
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(500).json({ message: 'No book Found' })
    }
    return res.status(201).json({ message: 'Deleted succesfully' })
}

exports.getAllBooks = getAllBooks;
exports.getById = getById;
exports.addBook = addBook;
exports.updatebook = updatebook;
exports.deleteBook = deleteBook;