interface EnvConfig {
    isDev: boolean
}

const config: EnvConfig = {
    isDev : import.meta.env.IS_DEV || true
}

export default config