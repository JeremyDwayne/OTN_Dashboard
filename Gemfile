source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.5'
# gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.3.18', '< 0.5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors', :require => 'rack/cors'

# JSON Web Tokens with Devise
gem 'devise_token_auth'
gem 'pundit'
gem 'fast_jsonapi'

gem 'omniauth'
gem 'omniauth-twitter'
gem 'omniauth-facebook'
gem 'omniauth-google'
gem 'omniauth-oauth2', '~> 1.5.0'

# Secure Application Secrets
gem 'figaro'

gem 'friendly_id', '~> 5.1.0'

gem 'money-rails'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem "capistrano", "~> 3.10", require: false
  gem 'rvm1-capistrano3', require: false
  gem 'capistrano-rails'
  gem 'sshkit-sudo'
  gem 'capistrano-figaro-yml', '~> 1.0.2'
  gem 'capistrano-rails-console', require: false
  # gem 'capistrano-bundler', '~> 1.3'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
end

group :production do
  # gem 'passenger'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
