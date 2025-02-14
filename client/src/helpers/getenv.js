export const getEnv = (evename)=>{
    const env =  import.meta.env
    return env[evename]
}