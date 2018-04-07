class Api::V1::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    # TODO: devise_token_auth current_user and authenticate_user!
    if current_user.super_admin?
      @consortia = Consortium.all
    else
      @consortia = current_user.consortia
    end
    render json: ConsortiumSerializer.new(@consortia).serialized_json
  end
end
