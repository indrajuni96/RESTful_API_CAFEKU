const conn = require('../configs/config')

module.exports = {
    getProducts: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT p.id, p.name, p.description, p.image, c.name AS category, p.price, p.qty, p.created_at, p.updated_at FROM products AS p JOIN categories AS c ON p.category_id = c.id WHERE p.name LIKE ? ORDER BY ${data.sortBy} ${data.sortMode} LIMIT ?,?`, [data.search, data.offset, data.limit],
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    addProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO products SET ?', data,
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    editProduct: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE products SET ? WHERE ?', [data, id],
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM products WHERE ?', [id],
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    addQuantityProduct: (qty, id) => {
        return new Promise((resolve, reject) => {
            conn.query("UPDATE products SET qty = qty + ? WHERE ?", [qty, id],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                }
            );
        });
    },
    reduceQuantityProduct: (qty, id) => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT qty FROM products WHERE ?", id, (err, result) => {
                if (result.length > 0) {
                    const quantity = parseInt(result[0].qty, 10) - parseInt(qty, 10);
                    if (quantity > 0) {
                        conn.query(
                            "UPDATE products SET qty = ? WHERE ?",
                            [quantity, id],
                            err => {
                                if (!err) {
                                    resolve(result);
                                } else {
                                    reject(new Error(err));
                                }
                            }
                        );
                    } else {
                        reject(new Error(err));
                    }
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
}