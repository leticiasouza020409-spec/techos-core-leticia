// ===================================================================================
// TechOS Core - Implementação Completa em Arquivo Único (Node.js)
// ===================================================================================

// 1. Modelos POO (Herança e Domínio)
class Usuario {
    constructor(id, nome, email) {
        if (this.constructor === Usuario) {
            throw new Error("Classe abstrata 'Usuario' não pode ser instanciada diretamente.");
        }
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    getId() { return this.id; }
    getNome() { return this.nome; }
    getEmail() { return this.email; }
}

class Cliente extends Usuario {
    constructor(id, nome, email, telefone) {
        super(id, nome, email);
        this.telefone = telefone;
    }

    getTelefone() { return this.telefone; }
}

class Tecnico extends Usuario {
    constructor(id, nome, email, especialidade) {
        super(id, nome, email);
        this.especialidade = especialidade;
    }

    getEspecialidade() { return this.especialidade; }
}

class OrdemServico {
    constructor(id, cliente, tecnico, descricao) {
        this.id = id;
        this.cliente = cliente;
        this.tecnico = tecnico;
        this.descricao = descricao;
        this.status = "ABERTA";
    }

    getDetalhes() {
        return {
            id: this.id,
            cliente: this.cliente.getNome(),
            tecnico: this.tecnico.getNome(),
            status: this.status,
            descricao: this.descricao
        };
    }
}

// 2. Padrão Factory Method
class UsuarioFactory {
    static criarUsuario(tipo, dados) {
        switch (tipo.toUpperCase()) {
            case 'CLIENTE':
                console.log(`[FACTORY] Criando Usuário Tipo: CLIENTE... -> Objeto 'Cliente' criado (ID: ${dados.id}, Nome: ${dados.nome}).`);
                return new Cliente(dados.id, dados.nome, dados.email, dados.telefone);
            
            case 'TECNICO':
            case 'TÉCNICO':
                console.log(`[FACTORY] Criando Usuário Tipo: TECNICO... -> Objeto 'Tecnico' criado (ID: ${dados.id}, Nome: ${dados.nome}).`);
                return new Tecnico(dados.id, dados.nome, dados.email, dados.especialidade);
            
            default:
                throw new Error(`Tipo de usuário desconhecido: ${tipo}`);
        }
    }
}

// 3. Padrão Singleton
class GerenciadorOS {
    constructor() {
        if (GerenciadorOS.instancia) {
            return GerenciadorOS.instancia;
        }
        this.ordensServico = [];
        GerenciadorOS.instancia = this;
        console.log("[SINGLETON] Instância única do GerenciadorOS inicializada.");
    }

    criarOrdemServico(id, cliente, tecnico, descricao) {
        const novaOS = new OrdemServico(id, cliente, tecnico, descricao);
        this.ordensServico.push(novaOS);
        console.log(`[SISTEMA] Ordem de Serviço #${id} registrada com sucesso!`);
        return novaOS;
    }

    listarOrdensAtivas() {
        return this.ordensServico.map(os => os.getDetalhes());
    }
}

// ===================================================================================
// Execução da Aplicação (Console)
// ===================================================================================
console.log("===================================================================================");

// Inicializando o Gerenciador (Singleton)
const gerenciador = new GerenciadorOS();

// Criando Usuários via Factory
const clienteAna = UsuarioFactory.criarUsuario('CLIENTE', {
    id: 101,
    nome: 'Ana',
    email: 'ana@email.com',
    telefone: '(81) 99999-1111'
});

const tecnicoCarlos = UsuarioFactory.criarUsuario('TECNICO', {
    id: 202,
    nome: 'Carlos',
    email: 'carlos@techos.com',
    especialidade: 'Hardware & Smartphones'
});

// Registrando a Ordem de Serviço
gerenciador.criarOrdemServico(1, clienteAna, tecnicoCarlos, "Troca de Tela");

console.log("[SISTEMA] Lista de OS ativas:");
console.log(JSON.stringify(gerenciador.listarOrdensAtivas(), null, 2));

console.log("===================================================================================");// Pull Request finalizado
