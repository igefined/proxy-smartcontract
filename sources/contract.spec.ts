import {toNano} from "@ton/core";
import {ContractSystem} from "@tact-lang/emulator";
import {Proxy} from "./output/sample_Proxy";
import {inspect} from "util";

describe("contract", () => {
    it("forward message", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let u1 = system.treasure("user_1");
        let u2 = system.treasure("user_2");
        let proxy = system.open(await Proxy.fromInit(owner.address));
        let proxyTracker = system.track(proxy)

        await proxy.send(u1, {value: toNano("0.1")}, {$$type: 'ProxyMessage', str: 'Hello', to: u2.address});
        await system.run();

        expect(await proxy.getGetCount()).toEqual(1n);
        expect((await proxy.getGetLast()).message).toEqual("Hello");
        expect(((await proxy.getGetLast()).receiver)?.equals(u2.address)).toBeTruthy();
        expect(((await proxy.getGetLast()).sender)?.equals(u1.address)).toBeTruthy();
        let proxyEvents = proxyTracker.collect();
        expect(proxyEvents).toMatchSnapshot();
        console.log(inspect(proxyEvents, true, null, true));
    });
});
