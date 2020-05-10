const URLAPP = 'https://crud-basico-barbieri.herokuapp.com/produtos';
var vApp;
function createVueApp() {
    vApp = new Vue({
        el: '#app',
        data() {
            return {
                produtos: [{}],
                projeto: 'DEVWEB - V1.00'
            }
        },
        methods: {
            getProdutos: function () {
                axios.get(URLAPP)
                    .then(function (response) {
                        console.log(response)
                        if (response.status == 200)
                            vApp.produtos = response.data
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            },
            getProdutoCodigo: function () {
                let codigo = document.querySelector('#fbusca-codigo').value

                axios.get(`${URLAPP}/${codigo}`)
                    .then( function (response) {
                        console.log(response)
                        if (response.status == 200)
                            vApp.produtos = [response.data]
                            document.querySelector('#fbusca-codigo').value = ''
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            },
            postProduto: function () {

                var formDesc = document.querySelector('#fdescricao').value

                var formUnid = document.querySelector('#funidade').value

                var formPrec = document.querySelector('#fpreco').value

                var formSald = document.querySelector('#fsaldo').value

                document.querySelector('#fcodigo').value = ''
   
                var body = {
                    descricao: formDesc, 
                    unidade: formUnid, 
                    preco: parseFloat(formPrec).toFixed(2), 
                    saldo: parseFloat(formSald).toFixed(2)
                }

                axios.post(URLAPP, body)
                    .then(function (response) {
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            putProduto: function () {

                var formDesc = document.querySelector('#fdescricao').value

                var formUnid = document.querySelector('#funidade').value

                var formPrec = document.querySelector('#fpreco').value

                var formSald = document.querySelector('#fsaldo').value

                var codigo = document.querySelector('#fcodigo').value


   
                var body = {
                    descricao: formDesc, 
                    unidade: formUnid, 
                    preco: parseFloat(formPrec).toFixed(2), 
                    saldo: parseFloat(formSald).toFixed(2)
                }

                axios.put(`${URLAPP}/${codigo}`, body)
                    .then(function (response) {
                        console.log(response)
                        formResu.innerText = `Produto alterado!`
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            deleteProduto: function (obj) {
                var i = parseInt(obj.dataset.objectIndex)

                var product = vApp.produtos[i]

                var codigo = product.codigo

                console.log(codigo)

                axios.delete(`${URLAPP}/${codigo}`)
                    .then(function (response) {
                        console.log(response)
                })
                .catch( function (error) {
                    console.log(error)
                })
            }
        }
    })
}

function enablePut(index) {

    var btnSend = document.querySelector('#btnSend')

    btnSend.innerText = 'Alterar'

    btnSend.setAttribute('onclick', 'vApp.putProduto()')

    var i = parseInt(index.dataset.objectIndex)

    var product = vApp.produtos[i]

    document.querySelector('#fdescricao').value = product.descricao

    document.querySelector('#funidade').value = product.unidade

    document.querySelector('#fpreco').value = product.preco

    document.querySelector('#fsaldo').value = product.saldo

    document.querySelector('#fcodigo').value = product.codigo

}
