require "capistrano/setup"
require "capistrano/deploy"
install_plugin Capistrano::SCM::Git

require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano3/unicorn'


Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
