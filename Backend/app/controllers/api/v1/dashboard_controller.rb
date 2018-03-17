module Api
  module V1
    class DashboardController < ApplicationController
      
      def index
        # TODO: devise_token_auth current_user and authenticate_user!
        @consortia = User.first.consortia
        render json: ConsortiumSerializer.new(@consortia).serialized_json
      end
    end
  end
end
