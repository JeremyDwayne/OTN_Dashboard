class Api::V1::UserInvitationsController < Devise::InvitationsController
  include InvitableMethods
  before_action :authenticate_user!, only: :create
  # before_action :resource_from_invitation_token, only: [:edit, :update]
  before_action :update_sanitized_params, only: [:edit, :update]

  def new
    super
  end

  def create
    super
  end

 def edit
    sign_out send("current_#{resource_name}") if send("#{resource_name}_signed_in?")
    set_minimum_password_length
    resource.invitation_token = params[:invitation_token]
    redirect_to "#{ENV['API']}/users/invitation/accept?invitation_token=#{params[:invitation_token]}"
  end

  def update
    super do |resource|
      if resource.errors.empty?
        render json: { status: "Invitation Accepted!" }, status: 200 and return
      else
        render json: resource.errors, status: 401 and return
      end
    end
  end

  private
  
  def update_sanitized_params
    devise_parameter_sanitizer.permit(:accept_invitation, keys: [:first_name, :last_name, :email, :password, :password_confirmation, :invitation_token])
  end

end
