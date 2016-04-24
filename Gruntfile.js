module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'index.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    connect: {
      options: {
        port: 9001,
        livereload: true,
        hostname: 'localhost',
        protocol: 'http'
      },
      livereload: {
          options: {
              open: true,
              base: [
                  '.'
              ]
          }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    watch: {
      files: '*.*',
      tasks: ['jshint'],
      options: {
        livereload: true,
      }
    },

    dev_prod_switch: {
        options: {
            environment: grunt.option('env') || 'dev',
            env_char: '#',
            env_block_dev: 'env:dev',
            env_block_prod: 'env:prod',
            env_block_test: 'env:test'
        },
        all: {
            files: {
                'index.html': 'index.html'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-dev-prod-switch');

  // Default task(s).
  grunt.registerTask('build', ['uglify']);

  // dev task(s).
  grunt.registerTask('default', ['dev_prod_switch', 'connect', 'watch']);

};