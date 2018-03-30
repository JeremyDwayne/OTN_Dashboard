# config valid for current version and patch releases of Capistrano
lock "~> 3.10.1"

set :application, "otn-dashboard"
set :repo_url, "git@github.com:JeremyDwayne/OTN_Dashboard.git"

set :use_sudo, true

set :ruby_version, "ruby-2.5.0"
set :rvm_ruby_version, "ruby-2.5.0"
set :rvm1_ruby_version, "#{fetch :ruby_version}@#{fetch :application}"
set :rvm1_map_bins, %w{rake gem bundle ruby}

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/#{fetch :application}"

# Default value for :format is :airbrussh.
set :format, :airbrussh
set :repository_cache, "git_cache"
set :deploy_via, :remote_cache

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

append :linked_dirs, '.bundle'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
set :ssh_options, {
  forward_agent: true,
  keys: %w(~/.ssh/id_rsa)
}


namespace :app do
  task :update_rvm_key do
    execute :gpg, "--keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3"
  end
end
before 'deploy', 'rvm1:install:ruby'
before "rvm1:install:rvm", "app:update_rvm_key"
after "rvm1:install:rvm", "deploy:install_bundler"

namespace :figaro do
  desc "SCP transfer figaro configuration to the shared folder"
  task :setup do
    on roles(:app) do
      upload! "config/application.yml", "#{shared_path}/application.yml"
    end
  end

  desc "Symlink application.yml to the release path"
  task :symlink do
    on roles(:app) do
      execute "ln -sf #{shared_path}/application.yml #{release_path}/config/application.yml"
    end
  end

  desc "Check if figaro configuration file exists on the server"
  task :check do
    on roles(:app) do
      begin
        execute "test -f #{shared_path}/application.yml"
      rescue Capistrano::CommandError
        unless fetch(:force, false)
          logger.important 'application.yml file does not exist on the server "shared/application.yml"'
          exit
        end
      end
    end
  end
end
after "deploy:starting", "figaro:setup"



set :bundle_bins, fetch(:bundle_bins, []).push %w(compass)
namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), :except => { :no_release => true } do
      within "#{fetch(:deploy_to)}/current/" do
        with RAILS_ENV: fetch(:environment) do
          execute :rake, "db:migrate"
        end
        execute "touch #{current_path}/tmp/restart.txt"
      end
    end
  end

  task :install_bundler do
    on roles :all do
      execute :rvm, "all do gem install bundler"
    end
  end

  after  :finishing,    :cleanup
  after  :finishing,    :restart
end
