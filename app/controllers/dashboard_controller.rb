class DashboardController < ApplicationController
  def index
    @workshops = Workshop.all

    respond_to do |format|
      format.html {}
      format.json {
        render json: { workshops: @workshops }
      }
    end
  end
end
