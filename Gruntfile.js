module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      target1: {
        src: ['src/JustJs.js'],
        dest: 'build/<%= pkg.name %>-<%= pkg.version%>.js'
      },
      target2: {
        src: ['src/JustJs.js', 'src/node_support/justjs_ext.js'],
        dest: 'build/justjs-node.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>-<%= pkg.version%>.min.js'
      }
    },
    jshint: {
      files: ['src/**/*js'],
      options: {
        //console: true,
        //module: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};