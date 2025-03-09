function mapear(contentList) {
    console.log(window.innerWidth)
    contentList.map((item) => {
        createElements(item)
    })
}
async function objetosJSON() {
    try {
        const resposta = await fetch('data.json')
        console.log(resposta)
        const contentList = await resposta.json()
        console.log(contentList)
        mapear(contentList)
        console.log(contentList[0])

    } catch (erro) {
        console.error("Erro ao carregar o arquivo JSON:", erro)
    }

}

function cart(){
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
    
    cartColumn.appendChild(cartDiv)
    cartDiv.appendChild(titleCard)
    cartDiv.appendChild(insideCart)
    insideCart.appendChild(img)
    insideCart.appendChild(descriptionCard)


}

function createElements(item) {
    const productColumn = document.getElementById('productColumn')
    const productDiv = document.createElement('productDiv')
    productDiv.className = 'productDiv'

    const divImage = document.createElement('div')
    divImage.className = 'divImage'
    
    const productButton = document.createElement('button')
    productButton.className = 'imageButton'

    const productText = document.createElement('div')
    productText.className = 'productText'
    const paragraphCart = document.createElement('p')
    paragraphCart.innerHTML = 'Add to Cart'

    const addCart = document.createElement('img')
    addCart.src = ' ./assets/images/icon-add-to-cart.svg'

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

    productButton.appendChild(addCart)
    productButton.appendChild(paragraphCart)
    productDiv.appendChild(divImage)
    productDiv.appendChild(productText)
    divImage.appendChild(img)
    divImage.appendChild(productButton)
    productText.appendChild(category)
    productText.appendChild(name)
    productText.appendChild(price)
    productColumn.appendChild(productDiv)

}
