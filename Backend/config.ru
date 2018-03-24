# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'
run Rails.application

# allow cross origin requests
require 'rack/cors'
use Rack::Cors do
  allow do
    origins '*'
    resource '*',
      :headers => :any,
      :expose => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      :methods => [:get, :post, :options, :delete, :put]
  end
end
