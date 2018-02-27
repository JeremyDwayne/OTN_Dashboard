class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # TODO: Figure out Devise Login issues - CSRF error.....
  # protect_from_forgery with: :null_session, only: Proc.new { |c| c.request.format.json? }
  # before_action :authenticate_user!
end
