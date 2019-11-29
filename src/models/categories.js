const conn = require('../configs/config')

module.exports = {
    getCategories: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM categories',
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    addCategories: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO categories SET ?', data,
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    editCategories: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE categories SET ? WHERE ?', [data, id],
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    deleteCategories: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM categories WHERE ?', [id],
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