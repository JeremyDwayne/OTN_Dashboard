class Api::V1::DashboardController < ApplicationController
  include InvitableMethods
  before_action :authenticate_inviter!

  def resource_name
    :user
  end

  def index
    # TODO: devise_token_auth current_user and authenticate_user!
    if current_api_v1_user.super_admin?
      @consortia = Consortium.all
    else
      @consortia = current_api_v1_user.consortia
    end
    render json: ConsortiumSerializer.new(@consortia).serialized_json
  end
end
