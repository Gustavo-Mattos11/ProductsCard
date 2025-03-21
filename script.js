const products = 0
let stateOfButton = false
const titleCard = document.createElement('p')
const imgCake = document.createElement('img')
const descriptionCart = document.createElement('p')

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

function cart() {
    const centerColumn = document.getElementById('centerColumn')
    const cartDiv = document.createElement('div')
    cartDiv.className = 'cartDiv'


    const cartColumn = document.getElementById('cart')
    
    titleCard.innerHTML = `Your Cart (${products})`

    const insideCart = document.createElement('div')
    imgCake.src = "./assets/images/illustration-empty-cart.svg"
    descriptionCart.innerHTML = 'Your added items will appear here'
    if (window.innerWidth <= 425) {
        const footer = document.createElement('footer')

        centerColumn.appendChild(footer)
        footer.appendChild(cartDiv)



    } else {
        const main = document.querySelector('main')
        const aside = document.createElement('aside')
        main.insertBefore(aside, centerColumn)
        cartColumn.appendChild(cartDiv)
    }

    cartDiv.appendChild(titleCard)
    cartDiv.appendChild(insideCart)
    insideCart.appendChild(imgCake)
    insideCart.appendChild(descriptionCart)

    
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
            
            console.log(item.price*products)
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
            
            productButton.removeChild(addCart)
            productButton.removeChild(removeCart)
            productButton.insertBefore(imgCart, paragraphCart)
            paragraphCart.innerHTML = 'Add to Cart'
            const removeClass = productButton.classList
            removeClass.remove('quantity')
            stateOfButton = !stateOfButton


        } else if (products > 1) {
            products--
            let itemQuantity = [
                {
                    "category": item.category, 
                    "quantity": products}]
            console.log(`Category: ${itemQuantity[0].category}, Quantity: ${itemQuantity[0].quantity}`)
            paragraphCart.innerHTML = products
        }
        // somar ou diminuir quantidade ao clicar em um dos botões
    }
}