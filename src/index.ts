//HIERAQUIA (Enum) dos Ranks
enum ranks {
    E,
    D,
    C,
    B,
    A,
    S,
}

//ESPECIFICAÇÃO DE PATENTES (interface) 
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

enum tipoMissao {
    Rastreamento,
    Assalto,
    Defesa
}

interface dadosMissao {
    nivelMin: number;
    nivelMax: number;
}

const detalhesMissao: Record<tipoMissao, dadosMissao> = { //Mesmo formato anterior para as masmorras.
    [tipoMissao.Rastreamento]: { nivelMin: 1000, nivelMax: 12000},
    [tipoMissao.Assalto]: { nivelMin: 1000, nivelMax: 12000},
    [tipoMissao.Defesa]: { nivelMin: 1000, nivelMax: 12000}
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
    }
    
    else return false
    
}
console.log("ARMA FOI ATIBUIDA: " + geradorDeArma());


// GUILDA (Classes e Encapsulamento)
class Guilda {
    private cacadores: Cacador[] = [];

    //PORTAL RECRUTAMENTO (Métodos)
    public registrarCacador(registro: Cacador): void {

        this.cacadores.push(registro)

        console.log(`O cacador ${registro.nome} de Rank ${ranks[registro.rank]} acaba de se juntar á nossa causa!\n`)
    }
    //O TESTE DE SOBREVIVENCIA
    public enviarParaMissao(nome: string, dificuldade: number, tipoMissa: tipoMissao): boolean {
        const cacador = this.cacadores.find(no => no.nome === nome)
        const armaEspecial = this.cacadores.find(no => no.armaEspecial === cacador?.armaEspecial)



        if (!cacador)//(cacador === undefined)
        {
            console.log('Cacador nao encontrado');
            console.log('===========================================================');
            return false
        }
        //tirei o != undefined, o if ja verifica se é truthly
        if (armaEspecial?.armaEspecial && tipoMissa == tipoMissao.Assalto) {
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

//CRIACAO DE CACADORES
const npcs : Cacador [] = [
    criarCacador('Pobre', 51, ranks.E),
    criarCacador('Mediano', 15, ranks.C),
    criarCacador('Xing-lung', 21, ranks.S),
    // criarCacador('Maluco', 33, ranks.B), //E como acrescentar a tommy gun???
    // criarCacador('BigBig', 24, ranks.D),
]

//REGISTRANDO NO SISTEMA
const guilda = new Guilda();
guilda.registrarCacador(npcs[0]);
guilda.registrarCacador(npcs[1]);
guilda.registrarCacador(npcs[2])
// guilda.registrarCacador(npcs[3]);
// guilda.registrarCacador(npcs[4]);

//ENVIANDO PARA MISSAO
guilda.enviarParaMissao('Pobre', 5000, tipoMissao.Assalto)
guilda.enviarParaMissao('Mediano', 5000, tipoMissao.Defesa)
guilda.enviarParaMissao('Xing-lung', 5000, tipoMissao.Rastreamento)
// guilda.enviarParaMissao('Maluco', 5000, tipoMissao.Assalto)
// guilda.enviarParaMissao('BigBig', 5000, tipoMissao.Assalto)

//Construir a lógica de Randon nivel pra masmorra (linhas 37 a 52)
//Corrigir erro da lista de criação de personagens. > Ao tirar personagem, ainda aparece tentativa de console dos "excluídos"