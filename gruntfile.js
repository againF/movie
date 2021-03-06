module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js', 'app.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true                    
                }
            }
        },
        uglify: {
            development: {
              files: {
                'public/build/admin.min.js': 'public/js/admin.js',
                'public/build/detail.min.js': [
                  'public/js/detail.js'
                ]
              }
            }
          },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    //file: 'app.js',//入口文件
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.vscode/**', '使用说明.doc'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,//大量文件改动时不用每个改动都重启服务而是延迟几毫秒去重启服务
                    env: {
                        PORT: 4000
                    },
                    cwd: __dirname
                }
            }
        },

        mochaTest: {
            options: {
							reporter: 'spec'
						},
						src: ['test/**/*.js']
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');//用于自动重启app.js
    grunt.loadNpmTasks('grunt-concurrent');//针对慢任务开发
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.option('force', true);//防止因为语法错误中断整个grunt服务
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('test', ['mochaTest']);
    
};