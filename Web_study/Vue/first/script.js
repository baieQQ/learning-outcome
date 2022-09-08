var app = new Vue({
    el:'#app',
    data() {
        return {
            message: 'Welcome to Vue!',
            isOwO: false,
            user: ['owo', 'QwQ', 'QnQ', 'qqqqqqqqqqqqq'],
            newbullShit: '', 
            bullShitList: [],
            moneyTW: 0,
        };
    },
    methods: {
        myList: function(){
            if(!this.isOwO){
                alert('owowowowowo')
            }
            this.isOwO = !this.isOwO
        },
        addList: function(bullShit){
            this.bullShitList.push({content:bullShit, xddd: false})
        },
        removeList: function(bullShit){
            this.bullShitList.splice(this.bullShitList.indexOf(bullShit), 1)
        } 
    },
    computed:{
        whoTrue: function(){
            var w = '';
            for(var i = 0; i < this.bullShitList.length; i++){
                if(this.bullShitList[i].xddd)
                    w += "I am True " + this.bullShitList[i].content + '\n'; 
            }
            if(w != '') return w;
            else return "qnq";    
        }
    }
})