const products = 0

productList = [
    {
        name: 'Waffle',
        value: 0
    },
    {}
]

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

    const addProductsCard = () => {

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
        itemsCart(productButton, paragraphCart, imgCart)

    }
}
const itemsCart = (productButton, paragraphCart, imgCart) => {
    const removeCart = document.createElement('img')
    removeCart.src = './assets/images/icon-decrement-quantity.svg'

    const addCart = document.createElement('img')
    addCart.src = './assets/images/icon-increment-quantity.svg'

    let products = 1

    if (productButton.childElementCount <= 2) {

        paragraphCart.innerHTML = products


        removeCart.onclick = () => {
            if (products >= 1) {
                products--
            }
            paragraphCart.innerHTML = products // somar ou diminuir quantidade ao clicar em um dos botões
        }


        addCart.onclick = () => {
            products++
            paragraphCart.innerHTML = products // somar ou diminuir quantidade ao clicar em um dos botões
        }

        productButton.classList.add('quantity')

        productButton.insertBefore(removeCart, paragraphCart)
        productButton.appendChild(addCart)
        productButton.removeChild(imgCart)
    } 
    if (productButton.childElementCount == 3) {
        removeCart.onclick = () => {
            if(products == 1){
                addCart.parentNode.removeChild(addCart)
                removeCart.parentNode.removeChild(removeCart)
                console.log('a')
            }
        }
    }
}