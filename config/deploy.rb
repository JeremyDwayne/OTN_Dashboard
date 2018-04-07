# config valid for current version and patch releases of Capistrano
lock "~> 3.10.1"

set :application, "otn-dashboard"
set :ruby_version, "ruby-2.5.0"
set :repo_url, "git@github.com:JeremyDwayne/OTN_Dashboard.git"

set :use_sudo, false

set :rvm1_ruby_version, "#{fetch :ruby_version}@#{fetch :application}"
set :rvm1_map_bins, %w{rake gem bundle ruby puma pumactl}
set :rvm1_type, :user
set :rvm1_binary, '~/.rvm/bin/rvm'
# set :rvm_map_bins, [ 'rake', 'gem', 'bundle', 'ruby', 'puma', 'pumactl' ]

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/#{fetch :application}"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default value for :format is :airbrussh.
set :format, :airbrussh
set :repository_cache, "git_cache"
set :deploy_via, :remote_cache

# Skip migration if files in db/migrate were not modified
set :conditionally_migrate, true
set :migration_role, :app

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets"

# append :linked_dirs, '.bundle'

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
# after "rvm1:install:rvm", "deploy:install_bundler"

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

# namespace :angular do
#   task :build do
#     on roles :all, in: :sequence, wait: 5 do
#       puts "Building Angular for production"
#       execute "cd #{fetch :deploy_to}/current/Frontend"
#       execute "yarn install"
#       execute "ng build --prod --build-optimizer" --env=prod
#       puts "Symlinking Angular to public folder..."
#       execute "ln -s #{fetch :deploy_to}/current/Frontend/dist/* #{fetch :deploy_to}/current/public/"
#     end
#   end
# end
# before :deploy, "angular:build"

namespace :deploy do
  namespace :assets do
    Rake::Task["precompile"].clear_actions
    task :precompile do
        puts "DON'T PRECOMPILE ======================================================="
    end
    Rake::Task["backup_manifest"].clear_actions
    task :backup_manifest do
        puts "DON'T BACKUP MANIFEST ======================================================="
    end
  end

  after  :finishing,    :cleanup
  after  :finishing,    :restart
end
