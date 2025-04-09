// reference from next doc: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#version-history

import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

// use exmaple: 
/* another file
    import './envConfig.ts'
    
    export default defineConfig({
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    })
*/