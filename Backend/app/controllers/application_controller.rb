class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :configure_permitted_parameters, if: :devise_controller?
  devise_token_auth_group :member, contains: [:user]

  respond_to :json

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :institution_id])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:first_name, :last_name])
  end

end
