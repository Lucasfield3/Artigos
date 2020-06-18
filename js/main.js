const URLAPP = 'https://tio-dev-web.herokuapp.com/artigos';
var vApp;
function createVueApp() {
    vApp = new Vue({
        el: '#app',
        data() {
            return {
                artigos: [{}],
                projeto: 'DEVWEB - V1.00'
            }
        },
        methods: {
            getArtigos: function () {
                axios.get(URLAPP)
                    .then(function (response) {
                        console.log(response)
                    if(response.status == 200){
                        let listaArt = []
                        for(let artigo of response.data){

                            listaArt.push(dataPt(artigo))
                            
                        }
                        vApp.artigos = listaArt;
                    }else {
                        vApp.artigos = [];
                    }
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            },
            getArtigosSelecionados: function () {
                let busca = document.querySelector('#campo-busca').value
                let tipoBusca = document.getElementById('tipo-busca').value

                switch (tipoBusca){
                    case 'titulo-area':
                        axios.get(`${URLAPP}/titulo-area?search=${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                let listaArt = []
                                for(let artigo of response.data){
        
                                    listaArt.push(dataPt(artigo))
                                    
                                }
                                vApp.artigos = listaArt;
                            }else if(response.status == 204){
                                alert('busca não existe');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;
                    case 'id':
                        axios.get(`${URLAPP}/${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                vApp.artigos = [dataPt(response.data)]
                            }else if(response.status == 204){
                                alert('busca não existe');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;
                    case 'link':
                        axios.get(`${URLAPP}/link?link=${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                vApp.artigos = [dataPt(response.data)]
                            }else if(response.status == 204){
                                alert('busca não existe');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;
                    default:
                    
                    break;
                }
               
            },
            postArtigo: function () {
                //.currentDate.toLocaleDateString(this._locale);
                //pt-BR

                var formTitulo = document.querySelector('#ftitulo').value

                var formArea = document.querySelector('#farea').value

                var formLink = document.querySelector('#flink').value

                var formData = new Date(document.querySelector('#fdataPublicacao').value)

                console.log(formData)

                document.querySelector('#fid').value = ''
   
                var body = {
                    titulo: formTitulo, 
                    area: formArea, 
                    hiperLink: formLink, 
                    dataPublicacao: formData
                }

                axios.post(URLAPP, body)
                    .then(function (response) {
                        console.log(response)
                        vApp.artigos.push(dataPt(response.data))
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                    console.log(body);
   
            },
            putArtigo: function (index) {

                //var i = parseInt(index.dataset.objectIndex)
                //_new = _str.split('-').reverse().join('-');
                var formTitulo = document.querySelector('#ftitulo').value

                var formArea = document.querySelector('#farea').value

                var formLink = document.querySelector('#flink').value

                var formData = new Date(document.querySelector('#fdataPublicacao').value)
               

                var id = document.querySelector('#fid').value

                console.log(index);

   
                var body = {
                    titulo: formTitulo, 
                    area: formArea, 
                    hiperLink: formLink, 
                    dataPublicacao: formData
                }

                axios.put(`${URLAPP}/${id}`, body)
                    .then(function (response) {
                        console.log(response)
                        vApp.artigos[index] = dataPt(response.data)
                        vApp.artigos.push(response.data)
                        vApp.artigos.splice(vApp.artigos.length - 1, 1)

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            deleteArtigo: function (obj) {
                var i = parseInt(obj.dataset.objectIndex)

                var article = vApp.artigos[i]

                var id = article.id

                console.log(id)

                axios.delete(`${URLAPP}/${id}`)
                    .then(function (response) {
                        console.log(response)
                        vApp.artigos.splice(i, 1)
                })
                .catch( function (error) {
                    console.log(error)
                })
            },
            getData: function (){
                let busca = document.querySelector('#campo-busca').value
                let tipoBusca = document.getElementById('tipo-busca').value
                let inputFrom = document.getElementById('date-from').value
                let inputTo = document.getElementById('date-to').value
                let formData = document.querySelector('#fdataPublicacao').value

                if(busca == '') {
                    axios.get(`${URLAPP}/datas?from=${inputFrom}&to=${inputTo}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                let listaArt = []
                                for(let artigo of response.data){
        
                                    listaArt.push(dataPt(artigo))
                                    
                                }
                                vApp.artigos = listaArt;
                            }else if(response.status == 204){
                                alert('busca não existe');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                    })
                }else if(tipoBusca == 'titulo-area' && busca != ''){

                    axios.get(`${URLAPP}/titulo-area-datas?search=${busca}&from=${inputFrom}&to=${inputTo}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                let listaArt = []
                                for(let artigo of response.data){
        
                                    listaArt.push(dataPt(artigo))
                                    
                                }
                                vApp.artigos = listaArt;
                            }else if(response.status == 204){
                                alert('busca não existe');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                    })

                }else if (tipoBusca == 'id' && busca != ''){
                    alert('busca não existe');
                }else if (tipoBusca == 'link' && busca != ''){
                    alert('busca não existe');
                }


            }
        }
    
        
    })
}
function enablePost(){

    var btnCad = document.querySelector('#btnCad')
    var titulo = document.querySelector('#alterar')

    btnCad.innerText = 'Cadastrar'
    titulo.innerText = 'Cadastrar artigo'

    btnCad.setAttribute('onclick', 'vApp.postArtigo()')

    document.querySelector('#ftitulo').value = ''

    document.querySelector('#farea').value = ''

    document.querySelector('#flink').value = ''

    document.querySelector('#fdataPublicacao').value = ''

    document.querySelector('#fid').value = ''

}

function enablePut(index) {


    var btnSend = document.querySelector('#btnCad')
    var titulo = document.querySelector('#alterar')

    btnSend.innerText = 'Alterar'
    titulo.innerText = 'Alterar artigo'

    var i = parseInt(index.dataset.objectIndex)
    
    btnSend.setAttribute('onclick', `vApp.putArtigo(${i})`)

    var article = vApp.artigos[i]

    document.querySelector('#ftitulo').value = article.titulo

    document.querySelector('#farea').value = article.area

    document.querySelector('#flink').value = article.hiperLink

    document.querySelector('#fdataPublicacao').value = article.dataPublicacao

    document.querySelector('#fid').value = article.id

}
function dataPt(obj){

    let dataFormat =  new Date(obj.dataPublicacao)
    let dia = dataFormat.getDate()
    let mes = dataFormat.getMonth()
    let ano = dataFormat.getFullYear()
    dataFormat = (++dia) + '/' + (++mes) + '/' + ano;
    obj.dataPublicacao = dataFormat

    return obj
                        
}

