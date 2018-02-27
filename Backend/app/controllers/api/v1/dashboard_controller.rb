module Api
  module V1
    class DashboardController < ApplicationController
      def index
        @workshops = Workshop.all
        @consortia = Consortium.all
        @institutions = Institution.all

        render json: { workshops: @workshops, consortia: @consortia, institutions: @institutions }
      end
    end
  end
end
