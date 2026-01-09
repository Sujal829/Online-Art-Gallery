/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {'admin' | 'artist' | 'user'} role
 * @property {string} avatar
 * @property {string} [bio]
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {'Paintings' | 'Sketches' | 'Digital Art' | 'Sculptures'} category
 * @property {number} artistId
 * @property {string} artistName
 * @property {number} price
 * @property {number} discount
 * @property {string} image
 * @property {string} description
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} Order
 * @property {string} orderId
 * @property {number} userId
 * @property {Array<{productId: number, quantity: number, price: number}>} items
 * @property {number} totalAmount
 * @property {'Pending' | 'Completed' | 'Cancelled'} status
 * @property {string} date
 */

/**
 * @typedef {'All' | 'Paintings' | 'Sketches' | 'Digital Art' | 'Sculptures'} Category
 */

/**
 * @typedef {'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'} SortOption
 */