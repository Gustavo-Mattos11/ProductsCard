const products = 0
let stateOfButton = false
let stateOfCart = false
const cartDiv = document.createElement('div')
cartDiv.className = 'cartDiv'

function mapear(contentList) {
    contentList.map(item => createElements(item))
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

function emptyCart() {
    const centerColumn = document.getElementById('centerColumn')
    centerColumn.id = 'centerColumn'

    const cartColumn = document.getElementById('cartColumn')
    const titleCard = document.createElement('p')
    titleCard.innerHTML = 'Your Cart (0)'

    const insideCart = document.createElement('div')
    const img = document.createElement('img')
    img.src = "./assets/images/illustration-empty-cart.svg"
    const descriptionCard = document.createElement('p')
    descriptionCard.innerHTML = 'Your added items will appear here'
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
    insideCart.appendChild(img)
    insideCart.appendChild(descriptionCard)


}

function createElements(item) {
    const productColumn = document.getElementById('productColumn')
    const productDiv = document.createElement('div')
    productDiv.className = 'productDiv'

    const divImage = document.createElement('div')
    divImage.className = 'divImage'
    const imgSRC = window.innerWidth <= 479 ? item.image.mobile
        : window.innerWidth <= 768 ? item.image.tablet
            : item.image.desktop;
    divImage.innerHTML = `<img class="img" src="${imgSRC}">`

    const productButton = document.createElement('button')
    productButton.className = 'productButton'
    productButton.name = item.category
    productButton.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg">
                               <p>Add to Cart</p>`


    const formattedPrice = parseFloat(item.price).toFixed(2)
    const productText =  document.createElement('div')
    productText.innerHTML = `<div class="productText">
                                <p>${item.category}</p>
                                <p class="name">${item.name}</p>
                                <p style="color: orange">$${formattedPrice}</p>
                             </div>`

    productDiv.appendChild(divImage)
    productDiv.appendChild(productText)
    divImage.appendChild(productButton)
    productColumn.appendChild(productDiv)

    productButton.onclick = () => {
        console.log("productButton teste: " + item.name)
        changeButton(productButton, paragraphCart, imgCart)
        cartItems(item)// Criar função que cria um novo productsCart por cima do antigo só que direto com o produto inserido
    }
}
function cartItems(item) {
    const cartColumn = document.getElementById('cartColumn')
    console.log(`cartItems teste: ${item.name}`)

    const cartDivProducts = document.createElement('div')
    cartDivProducts.id = 'cartDivProducts'

    const cartDivProductsDOM = document.getElementById('cartDivProducts') // pega a div direto no DOM

    function AddCartItems(){ // Criar e adicionar items ao cartDivProducts
        console.log(item.name)
        const headerCart = document.createElement('p')
        headerCart.innerHTML = `Your Cart ${0}`

        const nameCart = document.createElement('p')



        cartColumn.appendChild(cartDivProducts)
        cartDivProducts.appendChild(headerCart)
        cartDivProducts.appendChild(nameCart)


    }

    cartDivProductsDOM == null && stateOfCart == false ? AddCartItems(item) : null // Verifica se a div NÃO está no DOM, se NÃO estiver já coloca ela.
    cartDiv && stateOfCart == false ? (cartColumn.removeChild(cartDiv), stateOfCart = !stateOfCart) : null; // Verifica se existe o cartDiv no DOM ou não, para após isso se TIVER, apaga-lo.
    cartDivProductsDOM != null && stateOfCart == true ? (cartColumn.removeChild(cartDivProductsDOM), cartColumn.appendChild(cartDiv), stateOfCart = !stateOfCart) : null


    console.log(stateOfCart)
}
const changeButton = (productButton, paragraphCart, imgCart) => {
    const removeCart = document.createElement('img')
    removeCart.src = './assets/images/icon-decrement-quantity.svg'


    const addCart = document.createElement('img')
    addCart.src = './assets/images/icon-increment-quantity.svg'

    let products = 1


    if (productButton.childElementCount <= 2) {

        paragraphCart.innerHTML = "Add to Cart"

        addCart.onclick = () => {
            products++
            paragraphCart.innerHTML = products // somar ou diminuir quantidade ao clicar em um dos botões
        }
        if (stateOfButton == false) {
            productButton.classList.add('quantity')
            productButton.insertBefore(removeCart, paragraphCart)
            productButton.appendChild(addCart)
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
            paragraphCart.innerHTML = products
        }
        // somar ou diminuir quantidade ao clicar em um dos botões
    }
}