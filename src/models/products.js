const conn = require('../configs/config')

module.exports = {
    getProducts: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM products',
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
    }
}