'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'assets/scripts/libs/jquery/*.js',
                    'assets/scripts/libs/bootstrap/transition.js',
                    'assets/scripts/libs/bootstrap/alert.js',
                    'assets/scripts/libs/bootstrap/button.js',
                    'assets/scripts/libs/bootstrap/carousel.js',
                    'assets/scripts/libs/bootstrap/collapse.js',
                    'assets/scripts/libs/bootstrap/dropdown.js',
                    'assets/scripts/libs/bootstrap/modal.js',
                    'assets/scripts/libs/bootstrap/tooltip.js',
                    'assets/scripts/libs/bootstrap/popover.js',
                    'assets/scripts/libs/bootstrap/scrollspy.js',
                    'assets/scripts/libs/bootstrap/tab.js',
                    'assets/scripts/libs/bootstrap/affix.js',
                    'assets/scripts/libs/*.js',
                    'assets/scripts/*.js'
                ],
                dest: 'assets/scripts/build/production.js',
            }
        },

        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: 'some'
            },
            build: {
                src: 'assets/scripts/build/production.js',
                dest: 'assets/scripts/build/production.min.js'
            }
        },

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'production.css.map',
                    sourceMapFilename: 'assets/css/build/production.css.map'
                },
                src: 'assets/css/less/bootstrap.less',
                dest: 'assets/css/build/production.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                  ]
            },
            core: {
                options: {
                    map: true
                },
                src: 'assets/css/build/production.css'
            }
        },

        cssmin: {
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            minifyCore: {
                src: 'assets/css/build/production.css',
                dest: 'assets/css/build/production.min.css'
            }
        },

        watch: {
            src: {
                files: 'assets/scripts/*.js',
                tasks: ['concat', 'uglify']
            },
            less: {
                files: 'assets/css/less/**/*.less',
                tasks: ['less', 'autoprefixer', 'cssmin']
            }
        } 

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'less', 'autoprefixer', 'cssmin', 'watch']);
};
