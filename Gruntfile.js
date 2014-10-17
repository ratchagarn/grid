module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Grid version <%= pkg.version %>\n' +
            ' * Copyright 2014-Preset\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',

    /**
     * ------------------------------------------------------------
     * Clean
     * ------------------------------------------------------------
     */
    

    clean: {
      dist: 'dist'
    },


    /**
     * ------------------------------------------------------------
     * Stylus
     * ------------------------------------------------------------
     */
    
    stylus: {
      options: {
        compress: false,
        banner: '<%= banner %>'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['grid.styl'],
          dest: 'dist',
          ext: '.css'
        }]
      }
    },


    /**
     * ------------------------------------------------------------
     * Concat
     * ------------------------------------------------------------
     */
    
    concat: {
      options: {
        separator: '',
      },
      dist: {
        src: ['bower_components/normalize.css/normalize.css', 'dist/grid.css'],
        dest: 'dist/grid-with-reset.css',
      },
    },


    /**
     * ------------------------------------------------------------
     * CSS min
     * ------------------------------------------------------------
     */
    
    cssmin: {
      options: {
        keepSpecialComments: 0,
        banner: '<%= banner %>'
      },
      normal: {
        files: {
          'dist/grid.min.css': ['dist/grid.css'],
          'dist/grid-with-reset.min.css': ['dist/grid-with-reset.css'],
        }
      }
    },


    /**
     * ------------------------------------------------------------
     * Watch
     * ------------------------------------------------------------
     */
    
    watch: {
      src: {
        files: 'src/grid.styl',
        tasks: ['stylus']
      }
    }


  });


  // https://github.com/gruntjs/grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean');


  // https://github.com/gruntjs/grunt-contrib-stylus
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // https://github.com/gruntjs/grunt-contrib-concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 
  grunt.loadNpmTasks('grunt-contrib-cssmin');



  grunt.registerTask('default', ['clean', 'stylus']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('dist', ['default', 'concat', 'cssmin']);

};