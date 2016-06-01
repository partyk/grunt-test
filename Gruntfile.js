/**
 * grunt config pro projekt
 * @param {type} grunt
 * @returns {undefined}
 */
/*
module.exports = function(grunt){
	grunt.registerTask('default', '', function(){
		grunt.log.write('Grunt jede');
	});

	grunt.registerTask('export', '', function(){
		grunt.log.write('Grunt export jede');
	});
};
*/
module.exports = function(grunt){
	//konfigurece hlavniho projektu
	grunt.initConfig({
		//zakladni nastaveni a informace o pluginech
		pkg: grunt.file.readJSON('package.json'),

		// vytvoreni watcheru pro sledovani zmeny CSS/JS + auto kompilace
		watch: {
			css : {
				files: ['client/css/*.css'],
				tasks: ['cssmin']
			},
			scripts: {
				files: ['client/js/*.js'],
				tasks: ['uglify']
			}
		},
		//cssmin
		cssmin: {
			combine: {
				files: {
					'html/css/main.css': ['client/css/content.css', 'client/css/sidebar.css']
				}
			}
		},
		// uglify
		uglify: {
			combine: {
				files: {
					'html/js/main.js': ['client/js/jquery-1.12.4.js', 'client/js/main.js']
				}
			}
		}
	});

	//nahrani pluginu
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//default spusteni tasku
	grunt.registerTask('default', ['cssmin', 'uglify']);

	//debug watcheru do konzole
	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln('WATCH: '+ target + ': ' + filepath + ' has ' + action);
	});
};