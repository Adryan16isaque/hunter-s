"use strict";
//HIERAQUIAS (Enums)
var ranks;
(function (ranks) {
    ranks[ranks["E"] = 0] = "E";
    ranks[ranks["D"] = 1] = "D";
    ranks[ranks["C"] = 2] = "C";
    ranks[ranks["B"] = 3] = "B";
    ranks[ranks["A"] = 4] = "A";
    ranks[ranks["S"] = 5] = "S";
})(ranks || (ranks = {}));
// GUILDA (Classes e Encapsulamento)
class Guilda {
    cacadores = [];
    //PORTAL RECRUTAMENTO (Métodos)
    registrarCacador(registro) {
        this.cacadores.push(registro);
        console.log(`O cacador ${registro.nome} de Rank ${registro.rank} acaba de se juntar á nossa causa!`);
    }
    enviarParaMissao(nome, dificuldade) {
        const cacador = this.cacadores.find(no => no.nome === nome);
        if (!cacador) //(cacador === undefined)
         {
            console.log('Cacador nao encontrado');
            console.log('===========================================================');
            return false;
        }
        if (cacador.poderDeBatalha >= dificuldade) {
            console.log(`Missao bem sucedida, o cacador: ${cacador.nome} conseguiu `);
            console.log('===========================================================');
            return true;
        }
        else {
            console.log(`O cacador ${cacador.nome} falhou tragicamente na missao`);
            cacador.vivo = false;
            console.log('===========================================================');
            return false;
        }
    }
    exibirMembrosAtivos() {
        let vivos = this.cacadores.filter(sobrevivente => sobrevivente.vivo == true);
        vivos.forEach(sobreviventes => console.log(sobreviventes.nome, sobreviventes.rank, sobreviventes.poderDeBatalha));
    }
}
const boot = {
    nome: 'Pobre',
    idade: 51,
    rank: ranks.E,
    poderDeBatalha: 3500,
    vivo: true
};
const boot2 = {
    nome: 'Mediano',
    idade: 15,
    rank: ranks.C,
    poderDeBatalha: 4500,
    vivo: true
};
const boot3 = {
    nome: 'Xing-lung',
    idade: 21,
    rank: ranks.S,
    poderDeBatalha: 9000,
    vivo: true
};
const guilda = new Guilda();
guilda.registrarCacador(boot);
guilda.registrarCacador(boot2);
guilda.registrarCacador(boot3);
guilda.enviarParaMissao('Pobre', 5000);
guilda.enviarParaMissao('Mediano', 5000);
guilda.enviarParaMissao('Xing-lung', 5000);
guilda.exibirMembrosAtivos();
