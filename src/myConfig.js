/* eslint-disable */

const ROOT_URL = 'http://176.122.152.6:8080/admin/'

const PAGE_SIZE = {
    large: 10,
    mid: 6,
    small: 3,
    test: 1,
}

const ROUTERS = {
    applyingRequest: 'seller/request/applying',
    aprrovedRequest: 'seller/request/approved',
    rejectedRequest: 'seller/request/rejected',
    handleRequest: 'seller/request/deal',
    deleteRequest: 'seller/request/delete',
    deleteShop: 'seller/shop/delete',
    deleteSeller: 'seller/delete',
    deleteBuyer: '',
    blackSomething: 'seller/blacklist/add',
    requestAmount: 'seller/request/amount',
    shopAmount: 'seller/shop/amount',
    sellerAmount: 'seller/amount',
    buyerAmount: '',
    listRequest: 'seller/request/list',
    listShop: 'seller/shop/list',
    listSeller: 'seller/list',
    listBuyer: '',
    SearchForShop: 'seller/search/shopname',
    SearchForSeller: 'seller/search/sellername',
    SearchForBuyer: '',
    
}

const REQUEST_STATUS = {
    applying: {status: 0},
    approved: {status: 1},
    rejected: {status: 2}
}


const INSTANCE_STATUS = {
    seller: 0,
    shop: 1,
    buyer: 2,

}

const TYPE = {
    request: Symbol('request'),
    seller: Symbol('seller'),
    buyer: Symbol('buyer'),
    shop: Symbol('shop'),
    default: Symbol('default'),
}

function GET_URL(path){ //得到url
    return ROOT_URL+path
}

export {
    ROOT_URL,
    PAGE_SIZE,
    ROUTERS,
    REQUEST_STATUS,
    INSTANCE_STATUS,
    GET_URL,
    TYPE
}