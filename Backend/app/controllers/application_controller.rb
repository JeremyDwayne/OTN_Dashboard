class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit( :sign_up, keys: [:first_name, :last_name, :institution_id])
    devise_parameter_sanitizer.permit( :sign_in, keys: [:first_name, :last_name, :institution_id])
  end
end
