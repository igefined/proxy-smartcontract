import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ProxyMessage = {
    $$type: 'ProxyMessage';
    str: string;
    to: Address;
}

export function storeProxyMessage(src: ProxyMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2376135367, 32);
        b_0.storeStringRefTail(src.str);
        b_0.storeAddress(src.to);
    };
}

export function loadProxyMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2376135367) { throw Error('Invalid prefix'); }
    let _str = sc_0.loadStringRefTail();
    let _to = sc_0.loadAddress();
    return { $$type: 'ProxyMessage' as const, str: _str, to: _to };
}

function loadTupleProxyMessage(source: TupleReader) {
    let _str = source.readString();
    let _to = source.readAddress();
    return { $$type: 'ProxyMessage' as const, str: _str, to: _to };
}

function storeTupleProxyMessage(source: ProxyMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.str);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserProxyMessage(): DictionaryValue<ProxyMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProxyMessage(src)).endCell());
        },
        parse: (src) => {
            return loadProxyMessage(src.loadRef().beginParse());
        }
    }
}

export type ChangeMsgOwner = {
    $$type: 'ChangeMsgOwner';
    addr: Address;
}

export function storeChangeMsgOwner(src: ChangeMsgOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1968402224, 32);
        b_0.storeAddress(src.addr);
    };
}

export function loadChangeMsgOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1968402224) { throw Error('Invalid prefix'); }
    let _addr = sc_0.loadAddress();
    return { $$type: 'ChangeMsgOwner' as const, addr: _addr };
}

function loadTupleChangeMsgOwner(source: TupleReader) {
    let _addr = source.readAddress();
    return { $$type: 'ChangeMsgOwner' as const, addr: _addr };
}

function storeTupleChangeMsgOwner(source: ChangeMsgOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.addr);
    return builder.build();
}

function dictValueParserChangeMsgOwner(): DictionaryValue<ChangeMsgOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeMsgOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeMsgOwner(src.loadRef().beginParse());
        }
    }
}

export type LastMessage = {
    $$type: 'LastMessage';
    message: string | null;
    sender: Address | null;
    receiver: Address | null;
}

export function storeLastMessage(src: LastMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.message !== null && src.message !== undefined) { b_0.storeBit(true).storeStringRefTail(src.message); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.receiver);
    };
}

export function loadLastMessage(slice: Slice) {
    let sc_0 = slice;
    let _message = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _sender = sc_0.loadMaybeAddress();
    let _receiver = sc_0.loadMaybeAddress();
    return { $$type: 'LastMessage' as const, message: _message, sender: _sender, receiver: _receiver };
}

function loadTupleLastMessage(source: TupleReader) {
    let _message = source.readStringOpt();
    let _sender = source.readAddressOpt();
    let _receiver = source.readAddressOpt();
    return { $$type: 'LastMessage' as const, message: _message, sender: _sender, receiver: _receiver };
}

function storeTupleLastMessage(source: LastMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.message);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserLastMessage(): DictionaryValue<LastMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLastMessage(src)).endCell());
        },
        parse: (src) => {
            return loadLastMessage(src.loadRef().beginParse());
        }
    }
}

 type Proxy_init_args = {
    $$type: 'Proxy_init_args';
    owner: Address;
}

function initProxy_init_args(src: Proxy_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function Proxy_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initProxy_init_args({ $$type: 'Proxy_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Proxy_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
}

const Proxy_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProxyMessage","header":2376135367,"fields":[{"name":"str","type":{"kind":"simple","type":"string","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeMsgOwner","header":1968402224,"fields":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LastMessage","header":null,"fields":[{"name":"message","type":{"kind":"simple","type":"string","optional":true}},{"name":"sender","type":{"kind":"simple","type":"address","optional":true}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":true}}]},
]

const Proxy_getters: ABIGetter[] = [
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_count","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_last","arguments":[],"returnType":{"kind":"simple","type":"LastMessage","optional":false}},
]

const Proxy_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Repeat"}},
    {"receiver":"internal","message":{"kind":"text","text":"Return"}},
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProxyMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeMsgOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Proxy implements Contract {
    
    static async init(owner: Address) {
        return await Proxy_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await Proxy_init(owner);
        const address = contractAddress(0, init);
        return new Proxy(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Proxy(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Proxy_types,
        getters: Proxy_getters,
        receivers: Proxy_receivers,
        errors: Proxy_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Repeat' | 'Return' | string | ProxyMessage | ChangeMsgOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'Repeat') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Return') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProxyMessage') {
            body = beginCell().store(storeProxyMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeMsgOwner') {
            body = beginCell().store(storeChangeMsgOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_count', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetLast(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_last', builder.build())).stack;
        const result = loadTupleLastMessage(source);
        return result;
    }
    
}