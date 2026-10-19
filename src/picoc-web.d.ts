// Types du moteur C (paquet picoc-web, sans types fournis)
declare module 'picoc-web' {
  export function RunWithInput(sourceCode: string, inputBuffer: string): Promise<{ stdout: string; stderr: string }>
}
