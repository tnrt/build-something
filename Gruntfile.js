module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets',
          environment: 'production'
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**'],
        tasks: ['compass'],
        options: {
          spawn: false
        },
      },
    },
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "0.0.0.0",
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('server',[
    'connect',
    'open',
    'watch'
  ]);

};
