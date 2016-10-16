(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',

            'ng2-bootstrap': 'npm:ng2-bootstrap',
            'moment': 'npm:moment/moment.js',

            'ng2-dragula': 'npm:ng2-dragula',
            'dragula': 'npm:dragula',
            'contra': 'npm:contra',
            'crossvent': 'npm:crossvent',
            'atoa': 'npm:atoa',
            'ticky': 'npm:ticky',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-bootstrap': {
                defaultExtension: 'js'
            },
            'ng2-dragula': {
                defaultExtension: 'js'
            },
            'dragula': {
                main: './dist/dragula.min.js',
                defaultExtension: 'js'
            },
            'contra': {
                defaultExtension: 'js'
            },
            'crossvent': {
                main: './dist/crossvent.js',
                defaultExtension: 'js'
            },
            'atoa': {
                main: './atoa.js',
                defaultExtension: 'js'
            },
            'ticky': {
                main: './ticky.js',
                defaultExtension: 'js'
            },
        }
    });
})(this);
