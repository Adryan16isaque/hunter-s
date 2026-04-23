//HIERAQUIAS (Enums)
//arrumar enumeracao
enum ranks {
    E,
    D,
    C,
    B,
    A,
    S,
}

enum tipoMissao {
    Rastreador,
    Assalto,
    Defesa
}

//REGISTRO DA ALMA (Interfaces)
interface Cacador {
    nome: string;
    idade: number;
    rank: ranks;
    poderDeBatalha: number;
    vivo: boolean;
    armaEspecial?: string;
}

// GUILDA (Classes e Encapsulamento)

class Guilda {
    private cacadores: Cacador[] = [];

    //PORTAL RECRUTAMENTO (Métodos)
    public registrarCacador(registro: Cacador): void {

        this.cacadores.push(registro)

        console.log(`O cacador ${registro.nome} de Rank ${registro.rank} acaba de se juntar á nossa causa!\n`)
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
            console.log(`Missao bem sucedida, o cacador: ${cacador.nome} conseguiu `);
            console.log('===========================================================');
            return true
        }
        else {
            console.log(`O cacador ${cacador.nome} falhou tragicamente na missao`);
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
const boot: Cacador = {
    nome: 'Pobre',
    idade: 51,
    rank: ranks.E,
    poderDeBatalha: 3500,
    vivo: true,
    armaEspecial: 'graveto'
}
const boot2: Cacador = {
    nome: 'Mediano',
    idade: 15,
    rank: ranks.C,
    poderDeBatalha: 4500,
    vivo: true
}
const boot3: Cacador = {
    nome: 'Xing-lung',
    idade: 21,
    rank: ranks.S,
    poderDeBatalha: 9000,
    vivo: true
}

const boot4: Cacador = {
    nome: 'Maluco',
    idade: 33,
    rank: ranks.E,
    poderDeBatalha: 3000,
    vivo: true,
    armaEspecial: 'TomasGun'
}

//REGISTRANDO NO SISTEMA
const guilda = new Guilda();
guilda.registrarCacador(boot);
guilda.registrarCacador(boot2);
guilda.registrarCacador(boot3);
guilda.registrarCacador(boot4);

//ENVIANDO PARA MISSAO
guilda.enviarParaMissao('Pobre', 5000, tipoMissao.Assalto)
guilda.enviarParaMissao('Mediano', 5000, tipoMissao.Defesa)
guilda.enviarParaMissao('Xing-lung', 5000, tipoMissao.Rastreador)
guilda.enviarParaMissao('Maluco', 5000, tipoMissao.Assalto)

//HIERAQUIAS (Enums)
//arrumar enumeracao
enum ranks {
    E,
    D,
    C,
    B,
    A,
    S,
}

interface dadosRanks {
  minPower: number;
  maxPower: number;
  hasSpecialWeapon: boolean;
}

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
    armaEspecial?: string;
}

// GUILDA (Classes e Encapsulamento)

class Guilda {
    private cacadores: Cacador[] = []; //esse objeto só funciona dentro dessa classe guilda

    //PORTAL RECRUTAMENTO (Métodos)
    public registrarCacador(registro: Cacador): void { //já essa função/método pode ser usada em qualquer parte do código.

        this.cacadores.push(registro) //registro é tipo uma variável que vai receber todos aqueles detalhes do caçador.

        console.log(`O cacador ${registro.nome} de Rank ${ranks[registro.rank]} acaba de se juntar á nossa causa!`) //aqui faço o acesso específico dos dados que estão nesse registro. ranks[registro.rank] pra pegar a letra mesmo e não o index.
    }
//     //O TESTE DE SOBREVIVENCIA
//     public enviarParaMissao(nome: string, dificuldade: number): boolean {
//         const cacador = this.cacadores.find(no => no.nome === nome)
//         if (!cacador)//(cacador === undefined)
//         {
//             console.log('Cacador nao encontrado');
//             console.log('===========================================================');
//             return false
//         }

//         if (cacador.poderDeBatalha >= dificuldade) {
//             console.log(`Missao bem sucedida, o cacador: ${cacador.nome} conseguiu `);
//             console.log('===========================================================');
//             return true
//         }
//         else {
//             console.log(`O cacador ${cacador.nome} falhou tragicamente na missao`);
//             cacador.vivo = false
//             console.log('===========================================================');

//             return false
//         }
//     }
//     //MURAL DOS VIVOS
//     public exibirMembrosAtivos(): void {
//         let vivos = this.cacadores.filter(sobrevivente => sobrevivente.vivo == true)

//         vivos.forEach(sobreviventes => 
//             console.log(sobreviventes.nome, sobreviventes.rank, sobreviventes.poderDeBatalha))
//     }
}

//CRIACAO DE CACADORES
// const boot: Cacador = {
//     nome: 'Pobre',
//     idade: 51,
//     rank: ranks.E,
//     poderDeBatalha: 3500,
//     vivo: true
// }
// const boot2: Cacador = {
//     nome: 'Mediano',
//     idade: 15,
//     rank: ranks.C,
//     poderDeBatalha: 4500,
//     vivo: true
// }
// const boot3: Cacador = {
//     nome: 'Xing-lung',
//     idade: 21,
//     rank: ranks.S,
//     poderDeBatalha: 9000,
//     vivo: true
// }

const boots: Boot[] = [];
boots.push (new Boot("Pobre",51,ranks.E,3500,true));
boots.push (new Boot("Mediano",15,ranks.C,4500,true));
boots.push (new Boot("Xing-lung",21,ranks.S,9000,true));
boots.push (new Boots("Maluco",33,ranks.E,3000,true,"TomasGun"))

//REGISTRANDO NO SISTEMA
const guilda = new Guilda();
guilda.registrarCacador(boot);
guilda.registrarCacador(boot2);
guilda.registrarCacador(boot3);

// //ENVIANDO PARA MISSAO
// guilda.enviarParaMissao('Pobre', 5000)
// guilda.enviarParaMissao('Mediano', 5000)
// guilda.enviarParaMissao('Xing-lung', 5000)

// //MOSTRANDO OS MEMBROS VIVOS
// guilda.exibirMembrosAtivos();

//MOSTRANDO OS MEMBROS VIVOS
guilda.exibirMembrosAtivos();
