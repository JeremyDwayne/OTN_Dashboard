class WorkshopsController < ApplicationController
  def index
    @workshops = Workshop.all
  end
end
