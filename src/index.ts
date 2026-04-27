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
    poderMinimo: number;
    poderMaximo: number;
    temArmaEspecial: boolean;
};

const detalhesRanks: Record<ranks, dadosRanks> = { //cria um objeto com chave e valor. Chave sendo cada letra de rank e o valor os dados que a gente queria colocar
    [ranks.E]: { poderMinimo: 1000, poderMaximo: 2000, temArmaEspecial: false },
    [ranks.D]: { poderMinimo: 2001, poderMaximo: 4000, temArmaEspecial: false },
    [ranks.C]: { poderMinimo: 4001, poderMaximo: 6000, temArmaEspecial: false },
    [ranks.B]: { poderMinimo: 6001, poderMaximo: 8000, temArmaEspecial: true },
    [ranks.A]: { poderMinimo: 8001, poderMaximo: 10000, temArmaEspecial: true },
    [ranks.S]: { poderMinimo: 10001, poderMaximo: 12000, temArmaEspecial: true },
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

        if (tipoEscolhido === tipoMissao.Assalto) {
        console.log(`Chance de caçadores receberem ARMA ESPECIAL`);
        console.log('===========================================================');
        
        console.log(`====== PAINEL DE NOVOS MEMBROS ======`);
        registrarMembrosGuilda();

        console.log(`====== RESULTADO DA MISSÃO ======`)
        enviarMembros(dificuldadeMissao, tipoEscolhido);
    }
});

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
    const { poderMinimo, poderMaximo } = detalhesRanks[rank]
    const poderRank = Math.floor(Math.random() * (poderMaximo - poderMinimo + 1) + poderMinimo)
    return poderRank
}

function geradorDeArma(): boolean {
    const resultadoDeArma = Math.random() < 0.5
    
    if (resultadoDeArma == true) {
        return true
    } else return false
}


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
        //define se vai ter arma especial atribuída ao personagem e acrescenta o buff.
        if (tipoDeMissao === tipoMissao.Assalto && cacador.armaEspecial === true) {
            cacador.poderDeBatalha += 2000
            console.log(`${cacador.nome} recebeu buff`);
        }
        
        if (cacador.poderDeBatalha >= dificuldade) {
            console.log(`Missao bem sucedida, o cacador: ${cacador.nome} conseguiu com ${cacador.poderDeBatalha} de poder!`);
            console.log('===========================================================');
            return true
        }
        else {
            console.log(`O cacador ${cacador.nome} falhou tragicamente na missao com ${cacador.poderDeBatalha} de poder!`);
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
    criarCacador('Maluco', 33, ranks.B),
    criarCacador('BigBig', 24, ranks.D),
]

//REGISTRANDO NO SISTEMA (Mostra aqueles que estão na guilda)
const guilda = new Guilda();
function registrarMembrosGuilda() {
    guilda.registrarCacador(npcs[0]);
    guilda.registrarCacador(npcs[1]);
    guilda.registrarCacador(npcs[2]);
    guilda.registrarCacador(npcs[3]);
    guilda.registrarCacador(npcs[4]);
}

//ENVIANDO PARA MISSAO (Mesmo registrado, somente aqui ele é ou não enviado para a missão)
function enviarMembros(dificuldadeMissao: number, tipoEscolhido: tipoMissao) {
    guilda.enviarParaMissao('Pobre', dificuldadeMissao, tipoEscolhido);
    guilda.enviarParaMissao('Mediano', dificuldadeMissao, tipoEscolhido);
    guilda.enviarParaMissao('Xing-lung', dificuldadeMissao, tipoEscolhido);
    guilda.enviarParaMissao('Maluco', dificuldadeMissao, tipoEscolhido);
    guilda.enviarParaMissao('BigBig', dificuldadeMissao, tipoEscolhido);
}
