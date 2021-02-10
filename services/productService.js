const uniqid = require('uniqid')
const Cube = require('../models/Cube')
const fs = require('fs/promises')
let productsData = require('../config/products.json')
let path = require('path')
const { dirname } = require('path')

function getAll(query) {
    let results = productsData

    if(query.search) {
        results = productsData.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()))
    }

    if(query.from) {
        results = results.filter(x => Number(x.level) >= query.from)
    }

    if(query.to) {
        results = results.filter(x => Number(x.level) <= query.to)
    }

    return results
}

function getOne(id) {
    return productsData.find(x => x.id == id)
}

function createProduct(data, callback) {
    let cube = new Cube(
        uniqid(), 
        data.name, 
        data.description, 
        data.imageUrl, 
        data.difficultyLevel
    )

    productsData.push(cube)  

    // fs.writeFile(
    //     __dirname + '/../config/products.json', 
    //     JSON.stringify(productsData), 
    //     callback
    // )

    return fs.writeFile(
        __dirname + '/../config/products.json', 
        JSON.stringify(productsData), 
    )
}

module.exports = {
    create: createProduct,
    getAll,
    getOne,
}