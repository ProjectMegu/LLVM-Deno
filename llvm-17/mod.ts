// use --allow-env
// You must set "LLDENO-17" LLVM Path
// example: /usr/lib/llvm-17/lib/libLLVM.so

// Load LLVM Path
const path = Deno.env.get("LLDENO_17")

if (typeof path !== "string") {
    console.log("'LLDENO_17' is not define. Please set value to 'LLDENO_17'.")
    Deno.exit(1)
}

/**  
 * Provides LLVM-C Path
 * @example
 * Linux: /usr/lib/llvm-17/lib/libLLVM.so
*/
export const LLVMPath = path as string