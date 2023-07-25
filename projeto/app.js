VUE:
new Vue({
    el: '#app',
    data: {
        //renderização condicional 
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        //função que inicia jogo
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        //função atacar - vai funcionar para ataque normal
        //especial
        attack(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
        },
        //função para causar dano
        hurt(attr, min, max, especial, source, target, cls) {
            //caso especial seja verdadeiro soma 5,
            //caso seja falso soma 0
            const plus = especial ? 5 : 0
            //causa dano aleatorio
            const hurt = this.getRandom(min + plus, max + plus)
            //evita que o playerLife seja negativo, compara os dois parametros
            //'this.playerLife' e '0' e define o menor numero para não ser
            //negativo
            this[attr] = Math.max(this[attr] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        //função que pega o 'this.player' + valor da cura e associa ao jogador
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        healAndHurt() {
            //recebeu cura entre 10 a 15
            this.heal(10, 15)
            //em seguida recebe ataque de 7 a 12
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        //função que cria valor de ataque aleatório
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }
    }, 
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})