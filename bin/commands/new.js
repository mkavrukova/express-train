var boilerplate = require('boilerplate'),
    path = require('path'),
    fs = require('fs'),
    ps = require('child_process');


module.exports = function (program) {
    var cmd = program.command('new <destination>')
        .option('-b, --boilerplate', 'A valid boilerplate to use for the new project')
        .option('-v, --verbose', 'Verbose output');

    cmd.action(function (destination) {
        var source = cmd.boilerplate || 'default';
        var destination = path.resolve(process.cwd(), destination);

        boilerplate.generate(source, destination, function (err, stdout) {
            console.log(stdout);
            var install = ps.spawn('npm',['install -d', (cmd.verbose?'--verbose':'')], {
                cwd: destination
            });

            install.stdout.pipe(process.stdout);
            install.stderr.pipe(process.stderr);
            install.on('exit', function(){
                console.log('express train app is ready!');
                console.log('go to %s to get started', destination);
            })
        });
    });
}