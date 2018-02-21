class DashboardController < ApplicationController
  def index
    @workshops = Workshop.all
    @consortia = Consortium.all
    @institutions = Institution.all

    respond_to do |format|
      format.html {}
      format.json {
        render json: { workshops: @workshops, consortia: @consortia, institutions: @institutions }
      }
    end
  end
end
