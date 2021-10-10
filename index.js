var app = new Vue({
    el: '#app',
    data: {
        //URL lista
        //'https://test-mais-a-educacao-v1.herokuapp.com?token=patriciaCorreaBernhardTautz'
        listaDeCadastro:[],
        dadosFormulario: {
            id:"",
            name:"",
            planet:"",
            birthDate:"",
            description:""
        }
     },
    methods: {
        //Faz chamada para API GET ALL buscando todos os cadastros
        buscar: function(){
             // GET ALL
            this.$http.get('https://test-mais-a-educacao-v1.herokuapp.com?token=patriciaCorreaBernhardTautz').then(response => {
                 // get lista Cadastro
                this.listaDeCadastro = response.body;
            }, response => {
                // error callback
                console.log(response.body)
            });
        },
        inserirAtualizar: function(){
            //Condição que verifica se formulario contém dados para criação/edição
            if (this.dadosFormulario.id == ""){
                // cria um Cadastro(Depois da chamada de criação atualiza a lista)
                this.$http.post('https://test-mais-a-educacao-v1.herokuapp.com?token=patriciaCorreaBernhardTautz',this.dadosFormulario).then(response => {
                    this.buscar();
                    //Limpa formulario
                    this.dadosFormulario.id =""
                    this.dadosFormulario.name =""
                    this.dadosFormulario.planet =""
                    this.dadosFormulario.birthDate =""
                    this.dadosFormulario.description =""
                    console.log(response.body)
                }, response => {
                    // error callback
                    console.log(response.body)
                });
            }else{
                //Faz edição
                this.$http.put('https://test-mais-a-educacao-v1.herokuapp.com/' + this.dadosFormulario.id + '?token=patriciaCorreaBernhardTautz',this.dadosFormulario).then(response => {
                    // cria um Cadastro
                    this.buscar();
                    //Limpa formulario
                    this.dadosFormulario.id =""
                    this.dadosFormulario.name =""
                    this.dadosFormulario.planet =""
                    this.dadosFormulario.birthDate =""
                    this.dadosFormulario.description =""
                    console.log(response.body)
                }, response => {
                    // error callback
                    console.log(response.body)
                });
            }   
        },
        //Método que recebe o cadastro da tabela e atribui os valores de vola ao formulário para edição
        voltaDadosFormulario: function(cadastro){
            this.dadosFormulario.id = cadastro.id
            this.dadosFormulario.name = cadastro.name
            this.dadosFormulario.planet = cadastro.planet
            this.dadosFormulario.birthDate = cadastro.birthDate
            this.dadosFormulario.description = cadastro.description
        },
        //Método Deletar
        deletaCadastro: function(id){
            this.$http.delete('https://test-mais-a-educacao-v1.herokuapp.com/' + id + '?token=patriciaCorreaBernhardTautz',this.dadosFormulario).then(response => {
               //Atualiza após deletar
                this.buscar();
                console.log(response.body)
            },response => {
                // error callback
                console.log(response.body)
            });
        }
    },
    //Especifica uma função que será executada assim que o componente for criado
    created: function(){
        this.buscar(); 
    }
});
