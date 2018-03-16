module Api
  module V1
    class DashboardController < ApplicationController
      # devise_token_auth_group :
      
      def index
        @user = User.first
        @consortia = @user.consortia
        render json: { user: UserSerializer.new(@user).serializable_hash, 
                       consortia: ConsortiumSerializer.new(@consortia, include: [:institutions]).serializable_hash
        }
      end
    end
  end
end
