import { defineCliConfig } from 'sanity/cli'

const projectId = '3uqae2yt'
const dataset = 'production'

export default defineCliConfig({
    api: {
        projectId,
        dataset,
    },
    studio: {
        basePath: '/studio',
    },
    deployment: {
        appId: 'ztlcvghfea48m8f09uznnbw4',
    }
})
