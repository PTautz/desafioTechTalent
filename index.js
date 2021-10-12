var app = new Vue({
    el: '#app',
    data: {
        //URL lista
        //'https://test-mais-a-educacao-v1.herokuapp.com?token=patriciaCorreaBernhardTautz'
        listaDeCadastro:[],
        listaFiltrada: [],
        dadosFormulario: {
            id:"",
            name:"",
            planet:"",
            birthDate:"",
            description:""
        },
        search: ''
    },
    methods: {
        //Faz chamada para API GET ALL buscando todos os cadastros
        buscar: function(){
             // GET ALL
            this.$http.get('https://test-mais-a-educacao-v1.herokuapp.com?token=patriciaCorreaBernhardTautz').then(response => {
                 // get lista Cadastro
                this.listaDeCadastro = response.body;
                this.search = ""
                this.filtrar();
            }, response => {
                // error callback
                console.log(response.body)
            });
        },
        inserirAtualizar: function(){
             // Faz validação dos campos
             var erroValidacao = false;
             if (this.dadosFormulario.name == "") {
                 alert("Nome não pode ser vazio!")
                 erroValidacao = true;
             }
             if (this.dadosFormulario.planet == "") {
                 alert("Planeta não pode ser vazio!")
                 erroValidacao = true;
             }
             if (this.dadosFormulario.birthDate == "") {
                 alert("Data de nascimento não pode ser vazia!")
                 erroValidacao = true;
             }
             if (!this.dataValida(this.dadosFormulario.birthDate)){
                 alert("Escreva uma data no formato: dd/mm/yyyy")
                 erroValidacao = true;
             }
             if (this.dadosFormulario.description == "") {
                 alert("Motivo não pode ser vazio!")
                 erroValidacao = true;
             }
             // se não houve erro de validacao segue pra chamada
            if (!erroValidacao) {
                //Condição que verifica se formulario contém dados para criação/edição
                if (this.dadosFormulario.id == ""){
                
                        // cria um Cadastro(Depois da chamada de criação atualiza a lista)
                        this.$http.post('https://test-mais-a-educacao-v1.herokuapp.com?token=patriciaCorreaBernhardTautz',this.dadosFormulario).then(response => {
                            //chama api para buscar a lista de cadastro
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
                    //Faz edição do cadastro
                    this.$http.put('https://test-mais-a-educacao-v1.herokuapp.com/' + this.dadosFormulario.id + '?token=patriciaCorreaBernhardTautz',this.dadosFormulario).then(response => {
                        //chama api para buscar a lista de cadastro
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
               //Atualiza após deletar o cadastro
                this.buscar();
                console.log(response.body)
            },response => {
                // error callback
                console.log(response.body)
            });
        },
        //Para validar a data peguei a expressão regular aqui:
        //https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
        dataValida: function (data) {
            var re = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
            return re.test(data);
        },
        filtrar: function() {
            if (this.search == "") {
                this.listaFiltrada = this.listaDeCadastro;   
            } else {
                this.listaFiltrada = this.listaDeCadastro.filter(cadastro => 
                    cadastro.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                        || cadastro.planet.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                        || cadastro.birthDate.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                )
            }
        }
    },
    //Especifica uma função que será executada assim que o componente de criação do cadastro for criado
    created: function(){
        this.buscar(); 
    }
});
