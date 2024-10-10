const bigShopProductos = [
    { id: "1", nombre: "Smartphone XYZ", precio: 45000, stock:14, img: "/public/img/producto.jpg", idCat: "personal", details: "Detalles del Producto" },
    { id: "2", nombre: "Laptop ABC", precio: 95000,stock:9, img: "/public/img/producto.jpg", idCat: "personal", details: "Detalles del Producto"  },
    { id: "3", nombre: "Tablet DEF", precio: 30000,stock:20, img: "/public/img/producto.jpg", idCat: "personal", details: "Detalles del Producto"  },
    { id: "4", nombre: "Auriculares inalámbricos", precio: 7500,stock:5, img: "/public/img/producto.jpg", idCat: "personal", details: "Detalles del Producto"  },
    { id: "5", nombre: "Reloj inteligente GHI", precio: 27000,stock:8, img: "/public/img/producto.jpg", idCat: "personal", details: "Detalles del Producto"  },
    { id: "6", nombre: "Televisor LED 50", precio: 120000,stock:10, img: "/public/img/producto.jpg", idCat: "domestico", details: "Detalles del Producto"  },
    { id: "7", nombre: "Parlante Bluetooth", precio: 15000, stock:15,img: "/public/img/producto.jpg", idCat: "domestico", details: "Detalles del Producto"  },
    { id: "8", nombre: "Cámara de seguridad", precio: 20000, stock:6,img: "/public/img/producto.jpg", idCat: "domestico" , details: "Detalles del Producto" }
];


export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(bigShopProductos)
        }, 100);
    })
}

export const callProduct = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const producto = bigShopProductos.find(item => item.id === id)
            resolve(producto)
        }, 100)
    })
}

export const getProductsCategory = (id) => {
    return new Promise(resolve =>{
        setTimeout(() => {
            const product = bigShopProductos.filter(item => item.idCat === id)
            resolve(product)
        }, 100);
    })
}