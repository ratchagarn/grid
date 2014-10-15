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
        compress: false
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
     * CSSlint (https://github.com/CSSLint/csslint/wiki)
     * ------------------------------------------------------------
     */

    csslint: {
      strict: {
        options: {
          "adjoining-classes": false,
          "box-sizing": false,
          "box-model": false,
          "compatible-vendor-prefixes": false,
          "floats": false,
          "font-sizes": false,
          "gradients": false,
          "ids": false,
          "important": false,
          "known-properties": false,
          "outline-none": false,
          "qualified-headings": false,
          "regex-selectors": false,
          "shorthand": false,
          "text-indent": false,
          "unique-headings": false,
          "universal-selector": false,
          "unqualified-attributes": false
        },
        src: ['dist/grid.css']
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
        dest: 'dist/grid.css',
      },
    },


    /**
     * ------------------------------------------------------------
     * Watch
     * ------------------------------------------------------------
     */
    
    watch: {
      src: {
        files: 'src/grid.styl',
        tasks: ['stylus', 'concat']
      }
    }


  });


  // https://github.com/gruntjs/grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean');

  // https://github.com/gruntjs/grunt-contrib-csslint
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // https://github.com/gruntjs/grunt-contrib-stylus
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // https://github.com/gruntjs/grunt-contrib-concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');



  grunt.registerTask('default', ['clean', 'stylus']);
  grunt.registerTask('dev', ['default', 'watch']);

};