import { LLVMPath } from "../mod.ts";

const func = Deno.dlopen(LLVMPath,
    {
        // https://llvm.org/doxygen/group__LLVMCCore.html
        
        LLVMAddSymbol: {
            parameters: [
                "pointer", // const char*
                "pointer", // void*
            ],
            result: "void"
        },

        LLVMCreateMessage: {
            parameters: [
                // const char*
                "pointer"
            ],
            result: "pointer" // char*
        },

        LLVMDisposeMessage: {
            parameters: [
                // char*
                "pointer"
            ],
            result: "void"
        },

        LLVMGetVersion: {
            parameters: [
                "pointer", // unsigned*
                "pointer", // unsigned*
                "pointer", // unsigned*
            ],
            result: "void"
        },

        LLVMLoadLibraryPermanently: {
            parameters: [
                "pointer", // const char*
            ],
            result: "i32", // LLVMBool
        },

        LLVMParseCommandLineOptions: {
            parameters: [
                "i32",
                "pointer", // const char *const *  <---??????????????????????????
                "pointer"  // const char *
            ],
            result: "void"
        },

        LLVMSearchForAddressOfSymbol: {
            parameters: [
                "pointer", // const char *
            ],
            result: "pointer" // void *
        },

        LLVMShutdown: {
            parameters: [],
            result: "void",
        }
    }
)

function CreateStringPointer(value: string) {
	const buffer = new Uint16Array(
		<number[]> [].map.call(value + '\0', (c: string) => {
			return c.charCodeAt(0);
		}),
	);
	return Deno.UnsafePointer.of(buffer);
}

export function LLVMAddSymbol(symbolName: string, symbolValue: Deno.PointerObject) {
    func.symbols.LLVMAddSymbol(CreateStringPointer(symbolName), symbolValue)
}

type LLVMMessage = Deno.PointerValue

export function LLVMCreateMessage(Message: string): LLVMMessage{
    const ret = func.symbols.LLVMCreateMessage(CreateStringPointer(Message))
    return ret
}

export function LLVMDisposeMessage(Message: LLVMMessage) {
    func.symbols.LLVMDisposeMessage(Message)
}

type LLVMVersion = [number, number, number]

export function LLVMGetVersion(): LLVMVersion {
    const major = new Uint32Array(1)
    const minor = new Uint32Array(1)
    const patch = new Uint32Array(1)

    func.symbols.LLVMGetVersion(
        Deno.UnsafePointer.of(major),
        Deno.UnsafePointer.of(minor),
        Deno.UnsafePointer.of(patch)
    )

    return [
        major[0],
        minor[0],
        patch[0]
    ]
}

export function LLVMLoadLibraryPermanently(Filename: string): boolean{
    const res = func.symbols.LLVMLoadLibraryPermanently(CreateStringPointer(Filename))
    if (res === 0) {
        return false
    } else {
        return true
    }
}

export function LLVMParseCommandLineOptions(argc: number, argv: Deno.PointerValue, Overview: string) {
    // What is argv?

    func.symbols.LLVMParseCommandLineOptions(argc, argv, CreateStringPointer(Overview))
}

export function LLVMSearchForAddressOfSymbol(symbolName: string): Deno.PointerValue {
    return func.symbols.LLVMSearchForAddressOfSymbol(CreateStringPointer(symbolName))
}

export function LLVMShutdown() {
    func.symbols.LLVMShutdown()
}