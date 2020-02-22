import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const map = core.getInput('map')
    const mapObj: {[key: string]: string | number} = JSON.parse(map)
    core.info('Setting env vars:')
    for (const key in mapObj) {
      const envVarname = key // `INPUT_${key.replace(/ /g, '_').toUpperCase()}`
      const value = mapObj[key].toString()
      process.env[envVarname] = value
      // eslint-disable-next-line no-console
      console.log(`::set-env name=${key}::${value}`)
      core.info(`Set ${envVarname} = ${value}`)
      core.setOutput(key, value)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
