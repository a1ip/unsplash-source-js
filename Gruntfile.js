/*
# Gruntfile
===========

All up in your code building your javascripts and stuff

Packages used:
 
  - JSHint
  - Karma

 */

var paths;

paths = {
  src: function (subpath) {
    return "./src/" + subpath;
  },
  dist: function (subpath) {
    return "./dist/" + subpath;
  },
  tests: function (subpath) {
    return "./tests/" + subpath;
  }
};

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    /*
    ## JS Hint
    https://github.com/gruntjs/grunt-contrib-jshint
     */
    "jshint": {
      files: [
        "Gruntfile.js",
        paths.src("core.js"),
      ],
      options: {
        globals: {
          console: true,
          module: true,
        }
      }
    },

    /*
    ## Karma
    https://github.com/karma-runner/grunt-karma
     */
    karma: {
      unit: {
        options: {
          files: [
            paths.src("core.js"),
            paths.tests("**/*.js"),
          ],
          autoWatch: true,
          frameworks: ["jasmine"],
          browsers: ["PhantomJS"],
        }
      }
    },

    concat: {
      options: {
        stripBanners: false,
        banner: "/*! https://unsplash.com <%= pkg.name %> - v<%= pkg.version %> - " +
        "<%= grunt.template.today('yyyy-mm-dd') %> " + "\n\n"
      },
      js: {
        src: [
          paths.src("banner.js"),
          paths.src("core.js"),
        ],
        dest: paths.dist("unsplash-source.js"),
      },
    },

  });

  // Load development plugins
  grunt.loadNpmTasks("grunt-notify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask("build", ["concat"]);
  grunt.registerTask("test", ["jshint", "karma"]);
};