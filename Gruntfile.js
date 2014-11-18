module.exports = function(grunt){ //the "wrapper" function

  /*========Project and task configurations======*/
  grunt.initConfig({
    //Pkg imports the JSON metadata stored in package.json into the grunt config
    pkg: grunt.file.readJSON('package.json'),
    //Uglify minifies your code to be more space efficient
    uglify: {
      // options:{
      //   mangle: false //set mangle: false to prevent changes to variable and function name
      // },
      my_target: {
        files: {
          'production/production.min.js' : ['production/production.js']
        }
      }
    },
    //Concat puts all the files you need into one big file 
    concat: {
      options: {
        separator: ';' //separates each file with a semicolon
      },
      dist: {
        src: ['www/js/**/*.js'], //concats all .js files in js folder
        dest: 'production/production.js' //puts all concatenated files into production.js in the production folder
      }
    },
    //Karma is a testing tool
    karma: {
      unit: {
        options: {
          configFile: 'karma.conf.js'
        }
      }
      
    },
    //JSHINT is a tool used to check the files are coded correctly
    jshint: {
      files: ['www/js/*.js']
    },
    //Watch will emit a watch event when watched files or tasks are modified
    watch: {
      scripts:{
        files: ['www/js/*.js', 'www/**/*.html']
      },
      tasks: ['concat', 'uglify'],
      karma: {
        files: [], //**** FILL IN
        tasks: ['karma unit:run']
      }
    }, 

  })

  /*======Loading Grunt plugins and tasks======*/
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /*======Custom tasks======u*/
  // grunt.registerTask('karma', ['karma']);
  grunt.registerTask('deploy', ['concat', 'uglify']);
}


/*Notes on the side when creating Grunt file*/
/*

option property may be specified to override built-in defaults,
each target may have an options property which is specific to that target

In uglify - Specify mangle: false to prevent changes to your variable and function names.
*/


///**********=======OLD GRUNT FILE === ********* do not delete below - using it as reference///
// module.exports = function(grunt) {

//   //Project Configurations
//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),
//     concat: {
//       dist: {
//         src: [
//           'www/js/*.js'
//         ],
//         dest: 'production/production.js'
//       }
//     },

//     mochaTest: {
//       test: {
//         options: {
//           reporter: 'spec'
//         },
//         src: ['test/*.js']
//       }
//     },

//     karma: {
//       unit: {
//         options: {
//           files: ['test/**/*.js'],
//           exclude:[],
//           background: true //The background option will tell grunt to run karma in a child process so it doesn't block subsequent grunt tasks.

//         }
//       }
//     },

//     // nodemon: {
//     //   dev: {
//     //     script: 'server.js'
//     //   }
//     // },

//     uglify: {
//       build: {
//         src: 'production/production.js',
//         dest: 'production/production.min.js'
//       }
//     },

//     jshint: {
//       files: [
//         'www/js/*.js'
//       ],
//       options: {
//         force: 'true',
//         jshintrc: '.jshintrc',
//         ignores: [
//           'www/lib/**/*.js',
//           'production/**/*.js'
//         ]
//       }
//     },

//     cssmin: {
//     },

//     watch: {
//       scripts: {
//         files: [
//           'www/js/*.js',
//           'www/lib/**/*.js',
//           'www/**/.html'
//         ],
//         tasks: [
//           'concat',
//           'uglify'
//         ]
//       },
//       css: {
//         files: 'www/css/*.css',
//         tasks: ['cssmin']
//       }
//     },

//     shell: {
//       prodServer: {
//         command: 'git push azure master'
//       }
//     },
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');
//   grunt.loadNpmTasks('grunt-contrib-cssmin');
//   grunt.loadNpmTasks('grunt-mocha-test');
//   grunt.loadNpmTasks('grunt-shell');
//   grunt.loadNpmTasks('grunt-nodemon');
//   grunt.loadNpmTasks('grunt-karma'); // used to run karma/jasmine unit testing

//   grunt.registerTask('server-dev', function (target) {
//     // Running nodejs in a different process and displaying output on the main console
//     var nodemon = grunt.util.spawn({
//          cmd: 'grunt',
//          grunt: true,
//          args: 'nodemon'
//     });
//     nodemon.stdout.pipe(process.stdout);
//     nodemon.stderr.pipe(process.stderr);

//     grunt.task.run([ 'watch' ]);
//   });

//   ////////////////////////////////////////////////////
//   // Main grunt tasks
//   ////////////////////////////////////////////////////

//   grunt.registerTask('test', [
//     'mochaTest'
//   ]);

//   grunt.registerTask('build', [
//     'mochaTest', 'concat', 'uglify', 'jshint', 'server-dev'
//   ]);

//   grunt.registerTask('upload', function() {
//     if(grunt.option('prod')) {
//       grunt.task.run(['shell']);
//     } else {
//       grunt.task.run([ 'server-dev' ]);
//     }
//   });

//   grunt.registerTask('deploy', [
//     'mochaTest', 'concat', 'uglify', 'jshint', 'shell'
//   ]);


// };