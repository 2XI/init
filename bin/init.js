#!/usr/bin/env node

const download = require('download-git-repo')
const program = require('commander')
const exists = require('fs').existsSync
const ora = require('ora')
const chalk = require('chalk')

/**
 * Usage.
 */

program.usage('<template-name> [project-name]')
// .option('-c, --clone', 'use git clone')

/**
 * Help.
 */

program.on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create a new project straight from a github template'))
    console.log('    $ init username/repo my-project')
    console.log(chalk.green('    $ init yanhaijing/jslib-base my-project'))
    console.log()
})

/**
 * Help.
 */

function help() {
    program.parse(process.argv)
    if (program.args.length < 1) 
        return program.help()
}
help()

function run() {
    let template = program.args[0]
    const target = program.args[1]
    if (exists(target)) {
        console.log(chalk.red('Target repo already exit!'))
        return
    }
    downloadAndGenerate(template, target)
}

run()

function downloadAndGenerate(template, target) {
    const spinner = ora('downloading template')
    spinner.start()
    download(template, target, err => {
        console.log(' success!')
        spinner.stop()
        if (err) {
            console.log()
            console.log('Failed to download repo')
        }
    })
}
