const products = 0
let stateOfButton = false
let stateOfCart = false
const titleCard = document.createElement('p')
titleCard.innerHTML = `Your Cart (0)`


const aside = document.createElement('aside')

function estrutura() {
    const centerColumn = document.getElementById('centerColumn')
    const main = document.querySelector('main')
    main.insertBefore(aside, centerColumn)
}

function mapear(contentList) {
    contentList.map((item) => {
        createElements(item)
    })
}
async function objetosJSON() {
    try {
        const resposta = await fetch('data.json')
        const contentList = await resposta.json()
        mapear(contentList)

    } catch (erro) {
        console.error("Erro ao carregar o arquivo JSON:", erro)
    }

}
function changeCart(item, products, imgCake, descriptionCart, insideCart, productButton, cartColumn, cartDiv) {
   
    
    if (products >= 1) {
        stateOfCart = !stateOfCart
        console.log('deu certo: ' + stateOfCart)
        cartDiv.remove(insideCart)
    } else {
    }
}
function cart(item, products, productButton) {
    estrutura()
    const imgCake = document.createElement('img')
    const descriptionCart = document.createElement('p')
    const cartDiv = document.createElement('div')
    cartDiv.className = 'cartDiv'

    const cartDivQuantity = document.getElementsByClassName('cartDiv') // Verificar quantas cartDiv existem no DOM

    const cartColumn = document.getElementById('cart')

    const insideCart = document.createElement('div')
    insideCart.className = 'insideCart'
    imgCake.src = "./assets/images/illustration-empty-cart.svg"

    if (stateOfCart == false) {
        descriptionCart.innerHTML = 'Your added items will appear here'
        if (window.innerWidth <= 425) {
            const footer = document.createElement('footer')

            centerColumn.appendChild(footer)
            footer.appendChild(cartDiv)
        }

        console.log(cartDivQuantity.length)
        cartDivQuantity.length < 2 ? cartColumn.appendChild(cartDiv) : null


        if (cartDivQuantity.length == 1 && stateOfButton == false) {
            console.log(cartDivQuantity.length)
            cartDiv.appendChild(titleCard)
            cartDiv.appendChild(insideCart)
            insideCart.appendChild(imgCake)
            insideCart.appendChild(descriptionCart)
        } else{
        changeCart(item, products, imgCake, descriptionCart, insideCart, productButton, cartColumn, cartDiv)
        }
    }

}

function createElements(item) {
    const productColumn = document.getElementById('productColumn')
    const productDiv = document.createElement('div')
    productDiv.className = 'productDiv'

    const divImage = document.createElement('div')
    divImage.className = 'divImage'

    const productButton = document.createElement('button')
    productButton.className = 'productButton'
    productButton.name = item.category


    const productText = document.createElement('div')
    productText.className = 'productText'
    const paragraphCart = document.createElement('p')
    paragraphCart.innerHTML = 'Add to Cart'

    const imgCart = document.createElement('img')
    imgCart.src = ' ./assets/images/icon-add-to-cart.svg'

    const category = document.createElement('p')
    category.innerHTML = item.category


    const name = document.createElement('p')
    name.innerHTML = item.name
    name.className = 'name'

    const img = document.createElement('img')
    img.className = 'img'

    const price = document.createElement('p')
    const formattedPrice = parseFloat(item.price).toFixed(2)
    price.innerHTML = `$${formattedPrice}`
    price.style = 'color: orange;'


    if (window.innerWidth <= 479) {
        img.src = item.image.mobile
    } else if (window.innerWidth > 479 && window.innerWidth <= 768) {
        img.src = item.image.tablet
    } else {
        img.src = item.image.desktop
    }

    productButton.appendChild(imgCart)
    productButton.appendChild(paragraphCart)
    productDiv.appendChild(divImage)
    productDiv.appendChild(productText)
    divImage.appendChild(img)
    divImage.appendChild(productButton)
    productText.appendChild(category)
    productText.appendChild(name)
    productText.appendChild(price)
    productColumn.appendChild(productDiv)

    productButton.onclick = () => {
        itemsCart(productButton, paragraphCart, imgCart, item)

    }
}
const itemsCart = (productButton, paragraphCart, imgCart, item) => {
    const removeCart = document.createElement('img') // imagem de remoção de item do carrinho
    removeCart.src = './assets/images/icon-decrement-quantity.svg'
    removeCart.style = "margin: 40%;"

    const removeCartDiv = document.createElement('div')
    removeCartDiv.className = "changeCartDiv"
    removeCartDiv.appendChild(removeCart)

    const addCart = document.createElement('img') // imagem de adição de item do carrinho
    addCart.src = './assets/images/icon-increment-quantity.svg'
    const addCartDiv = document.createElement('div')
    addCartDiv.className = "changeCartDiv"
    addCartDiv.appendChild(addCart)
    let products = 1


    if (productButton.childElementCount <= 2) {

        paragraphCart.innerHTML = "Add to Cart"

        addCart.onclick = () => {
            products++
            paragraphCart.innerHTML = products // somar ou diminuir quantidade ao clicar em um dos botões

            console.log(item.price * products)
        }
        if (stateOfButton == false) {
            productButton.classList.add('quantity')
            productButton.insertBefore(removeCartDiv, paragraphCart)
            productButton.appendChild(addCartDiv)
            productButton.removeChild(imgCart)
            paragraphCart.innerHTML = products
            stateOfButton = !stateOfButton

        }
        stateOfButton = !stateOfButton

    }
    removeCart.onclick = () => {

        if (products == 1) {

            productButton.removeChild(addCartDiv)
            productButton.removeChild(removeCartDiv)
            productButton.insertBefore(imgCart, paragraphCart)
            paragraphCart.innerHTML = 'Add to Cart'
            const removeClass = productButton.classList
            removeClass.remove('quantity')
            stateOfButton = !stateOfButton


        } else if (products > 1) {
            products--
            paragraphCart.innerHTML = products
            cart(item, products)

        }
        // somar ou diminuir quantidade ao clicar em um dos botões
    }
}