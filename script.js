async function mapear(contentList){
    try {
        console.log("a")
        const mapear = contentList.map(contentList)
        console.log(mapear)
        
    } catch(erro) {
        console.error("Erro ao carregar o arquivo JSON:", erro)
    }
    
}
async function objetosJSON(){
    try {
        const resposta = await fetch('data.json')
        const contentList = await resposta.json()
        mapear(contentList)
     
        
    } catch (erro) {
        console.error("Erro ao carregar o arquivo JSON:", erro)
    }
    
}
function createElements(element){
    const img = ""
}
