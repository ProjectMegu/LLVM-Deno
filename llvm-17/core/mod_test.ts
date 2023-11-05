import { LLVMGetVersion } from "./mod.ts";
import * as assert from "https://deno.land/std@0.205.0/assert/mod.ts";

Deno.test("LLVMGetVersion", () => {
    const v = LLVMGetVersion();
    assert.assertEquals(v, [17, 0, 4]);
})

// TODO: Write Test
