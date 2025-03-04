function mapear(contentList) {
    console.log(window.innerWidth)
    contentList.map((item) => {
        createElements(item)
    })
}
async function objetosJSON() {
    try {
        const resposta = await fetch('data.json')
        const contentList = await resposta.json()
        mapear(contentList)
        console.log(contentList[0])

    } catch (erro) {
        console.error("Erro ao carregar o arquivo JSON:", erro)
    }

}
function createElements(item) {
    const products = document.getElementById('products')
    const div = document.createElement('div')
    
    const divImage = document.createElement('div')
    divImage.className = 'divImage'
    
    const button = document.createElement('button')
    button.className = 'imageButton'
    const category = document.createElement('p')
    category.innerHTML = item.category
    category.className = 'category'
    
    const name = document.createElement('p')
    name.innerHTML = item.name
    name.className = 'name'
    
    const img = document.createElement('img')
    img.className = 'img'
    
    const price = document.createElement('p')
    price.innerHTML = `$${item.price}`
    
    if (window.innerWidth <= 479) {
        img.src = item.image.mobile
    } else if (window.innerWidth > 479 && window.innerWidth <= 768) {
        img.src = item.image.tablet
    } else {
        img.src = item.image.desktop
    }


    div.appendChild(divImage)
    divImage.appendChild(img)
    divImage.appendChild(button)
    div.appendChild(category)
    div.appendChild(name)
    div.appendChild(price)
    products.appendChild(div)
}
