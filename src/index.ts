//HIERAQUIA (Enum) dos Ranks
enum ranks {
    E,
    D,
    C,
    B,
    A,
    S,
}

//ESPECIFICAÇÃO DE RANKS (interface) 
interface dadosRanks {
    minPower: number;
    maxPower: number;
    hasSpecialWeapon: boolean;
};

const detalhesRanks: Record<ranks, dadosRanks> = { //cria um objeto com chave e valor. Chave sendo cada letra de rank e o valor os dados que a gente queria colocar
    [ranks.E]: { minPower: 1000, maxPower: 2000, hasSpecialWeapon: false },
    [ranks.D]: { minPower: 2001, maxPower: 4000, hasSpecialWeapon: false },
    [ranks.C]: { minPower: 4001, maxPower: 6000, hasSpecialWeapon: false },
    [ranks.B]: { minPower: 6001, maxPower: 8000, hasSpecialWeapon: true },
    [ranks.A]: { minPower: 8001, maxPower: 10000, hasSpecialWeapon: true },
    [ranks.S]: { minPower: 10001, maxPower: 20000, hasSpecialWeapon: true },
};

//REGISTRO DA ALMA (Interfaces)
interface Cacador {
    nome: string;
    idade: number;
    rank: ranks;
    poderDeBatalha: number;
    vivo: boolean;
    armaEspecial?: boolean;
};
//CONSTRUINDO MISSÃO
enum tipoMissao {
    Rastreamento,
    Assalto,
    Defesa
}

interface dadosMissao {
    tipo: tipoMissao;
    nivelMin: number;
    nivelMax: number;
}

const detalhesMissao: Record<tipoMissao, dadosMissao> = { //Mesmo formato anterior para as missões.
    [tipoMissao.Rastreamento]: { tipo: tipoMissao.Rastreamento, nivelMin: 1000, nivelMax: 12000},
    [tipoMissao.Assalto]: { tipo: tipoMissao.Assalto, nivelMin: 1000, nivelMax: 12000},
    [tipoMissao.Defesa]: { tipo: tipoMissao.Defesa, nivelMin: 1000, nivelMax: 12000}
}

// //SELEÇÃO DE MISSÃO
//EM CONSTRUÇÃO

function escolherMissao() {  //Aqui o usuário tem a chance de escolher, a partir de um evento "data", que captura o que foi digitado pelo usuário.
    console.log(`Escolha qual o tipo de missão:(R) Rastreamento, (A) Assalto, (D) Defesa`)
    process.stdin.once("data", (letraDigitada) => {
        const letraEscolhida = letraDigitada.toString().trim().toLowerCase()
        let tipoEscolhido: tipoMissao;

        if (letraEscolhida === "r") {
            tipoEscolhido = tipoMissao.Rastreamento;
            console.log("Missão iniciada:", tipoMissao[0])       
        } else if (letraEscolhida === "a") {
            tipoEscolhido = tipoMissao.Assalto;
            console.log("Missão iniciada:", tipoMissao[1])
            console.log("ARMA FOI ATIBUIDA: " + geradorDeArma());
        } else if (letraEscolhida === "d") {
            tipoEscolhido = tipoMissao.Defesa;
            console.log("Missão iniciada:", tipoMissao[2])
        } else {
            console.log(`Opção inválida! Reinicie a etapa.`)
            escolherMissao()
            return;
        }        
        
        geradorDeMissao(tipoEscolhido);

        const dificuldadeMissao = geradorDeMissao(tipoEscolhido);
        console.log(`Dificuldade: ${dificuldadeMissao}`)
        
        registrarMembrosGuilda();

    })
    // guilda.enviarParaMissao('Pobre', dificuldadeMissao, tipoEscolhido);
    // guilda.enviarParaMissao('Mediano', dificuldadeMissao, tipoEscolhido);
    // guilda.enviarParaMissao('Xing-lung', dificuldadeMissao, tipoEscolhido);
    // guilda.enviarParaMissao('Maluco', dificuldadeMissao, tipoEscolhido);
    // guilda.enviarParaMissao('BigBig', dificuldadeMissao, tipoEscolhido);
}
escolherMissao();

//NÍVEL DA MISSÃO ALEATÓRIO
function geradorDeMissao(tipo: tipoMissao):number {
    const { nivelMin , nivelMax } = detalhesMissao[tipo];
    const dificuldadeMissao = Math.floor(Math.random() * (nivelMax - nivelMin + 1) + nivelMin)

    return dificuldadeMissao;
}


//CRIAÇÃO DE PERSOANGENS
function criarCacador(nome: string, idade: number, rank: ranks): Cacador {
    return {
        nome: nome,
        idade: idade,
        rank: rank,
        poderDeBatalha: geradorDePoder(rank),
        vivo: true,
        armaEspecial: geradorDeArma()
    }
}

function geradorDePoder(rank: ranks): number {
    const { minPower, maxPower } = detalhesRanks[rank]
    const poderRank = Math.floor(Math.random() * (maxPower - minPower + 1) + minPower)
    return poderRank
}

function geradorDeArma(): boolean {
    const resultado = Math.random() < 0.5
    
    if (resultado == true) {
        return true
    } else return false
    
}
//TESTE E CONFERÊNCIA DA ARMA
// console.log("ARMA FOI ATIBUIDA: " + geradorDeArma());


// GUILDA (Classes e Encapsulamento)
class Guilda {
    private cacadores: Cacador[] = [];

    //PORTAL RECRUTAMENTO (Métodos)
    public registrarCacador(registro: Cacador): void {

        this.cacadores.push(registro)

        console.log(`O cacador ${registro.nome} de Rank ${ranks[registro.rank]} acaba de se juntar á nossa causa!\n`)
    }
    //O TESTE DE SOBREVIVENCIA
    public enviarParaMissao(nome: string, dificuldade: number, tipoDeMissao: tipoMissao): boolean {
        const cacador = this.cacadores.find(no => no.nome === nome)
        const armaEspecial = this.cacadores.find(no => no.armaEspecial === cacador?.armaEspecial)

        if (!cacador)//(cacador === undefined)
        {
            console.log('Cacador nao encontrado');
            console.log('===========================================================');
            return false
        }
        //tirei o != undefined, o if ja verifica se é truthly
        if (armaEspecial?.armaEspecial && tipoDeMissao == tipoMissao.Assalto) {
            cacador.poderDeBatalha += 2000
            console.log(`${cacador.nome} recebeu buff`);

        }
        
        if (cacador.poderDeBatalha >= dificuldade) {
            console.log(`Missao bem sucedida, o cacador: ${cacador.nome} conseguiu com ${cacador.poderDeBatalha} `);
            console.log('===========================================================');
            return true
        }
        else {
            console.log(`O cacador ${cacador.nome} falhou tragicamente na missao com ${cacador.poderDeBatalha}`);
            cacador.vivo = false
            console.log('===========================================================');

            return false
        }
    }
    //MURAL DOS VIVOS
    public exibirMembrosAtivos(): void {
        let vivos = this.cacadores.filter(sobrevivente => sobrevivente.vivo == true)

        vivos.forEach(sobreviventes =>
            console.log(sobreviventes.nome, sobreviventes.rank, sobreviventes.poderDeBatalha))
    }
}

//CRIACAO DE CACADORES (Onde são colocados os dados de cada um. Rank tem margem de poder baseado na interface dadosRanks)
const npcs : Cacador [] = [
    criarCacador('Pobre', 51, ranks.E),
    criarCacador('Mediano', 15, ranks.C),
    criarCacador('Xing-lung', 21, ranks.S),
    criarCacador('Maluco', 33, ranks.B), //Fazer depois um jeito de acrescentar a tommy gun???
    criarCacador('BigBig', 24, ranks.D),
]

//REGISTRANDO NO SISTEMA (Mostra aqueles que estão na guilda)
function registrarMembrosGuilda() {
    const guilda = new Guilda();
    guilda.registrarCacador(npcs[0]);
    guilda.registrarCacador(npcs[1]);
    guilda.registrarCacador(npcs[2]);
    guilda.registrarCacador(npcs[3]);
    guilda.registrarCacador(npcs[4]);
}

// //ENVIANDO PARA MISSAO (Mesmo registrado, somente aqui ele é ou não enviado para a missão)
// guilda.enviarParaMissao('Pobre', 5000, tipoMissao.Assalto)
// guilda.enviarParaMissao('Mediano', 5000, tipoMissao.Defesa)
// guilda.enviarParaMissao('Xing-lung', 5000, tipoMissao.Rastreamento)
// guilda.enviarParaMissao('Maluco', 5000, tipoMissao.Assalto)
// guilda.enviarParaMissao('BigBig', 5000, tipoMissao.Assalto)

//FEITO>>> Construir a lógica de Randon nivel pra masmorra (linhas 37 a 52)
//CORRIGIDO>>> Corrigir erro da lista de criação de personagens: Ao tirar personagem, ainda aparece tentativa de console dos "excluídos".
//Acrescentar "Escolha" de masmorra pro jogador >>> CORRIGIDO NO TSCONFIG: index.ts:76:5 - error TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
//Acrescentar "emboscada?" para Rastreameto e que dá debuff nos persoagens