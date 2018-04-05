# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require 'capistrano/rails'
require 'capistrano/rails/console'
require 'capistrano/figaro_yml'
# require 'capistrano/bundler'
require 'rvm1/capistrano3'
require 'capistrano/passenger'

require 'sshkit/sudo'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
# require 'capistrano/puma'
