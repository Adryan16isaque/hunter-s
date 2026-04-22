//HIERAQUIAS (Enums)
enum ranks {
    E,
    D,
    C,
    B,
    A,
    S,
}

enum tipoMissao{
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

        console.log(`O cacador ${registro.nome} de Rank ${registro.rank} acaba de se juntar á nossa causa!`)
    }
    //O TESTE DE SOBREVIVENCIA
    public enviarParaMissao(nome: string, dificuldade: number, tipoMissa:tipoMissao): boolean {
        const cacador = this.cacadores.find(no => no.nome === nome)
        const armaEspecial = this.cacadores.find(no => no.armaEspecial === cacador?.armaEspecial)
        
        
        
        if (!cacador)//(cacador === undefined)
        {
            console.log('Cacador nao encontrado');
            console.log('===========================================================');
            return false
        }
        
        if(armaEspecial?.armaEspecial!= undefined && tipoMissa== tipoMissao.Assalto){
            cacador.poderDeBatalha+= 2000
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
    vivo: true
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

const boot4:Cacador={
    nome: 'Maluco',
    idade: 33,
    rank: ranks.E,
    poderDeBatalha: 3000,
    vivo: true,
    armaEspecial:'TomasGun'
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

//MOSTRANDO OS MEMBROS VIVOS
guilda.exibirMembrosAtivos();