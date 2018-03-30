class Api::V1::WorkshopsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_workshop, only: [:show, :update, :destroy]
  # before_action :set_institution, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:index, :create, :update, :destroy]

  def index
    puts @current_user.inspect
    @workshops = @current_user.workshops
    render json: WorkshopSerializer.new(@workshops).serialized_json
  end

  def show
    render json: WorkshopSerializer.new(@workshop).serialized_json
  end

  def attendees
    @workshop = Workshop.friendly.find(params[:workshop_id])
    @attendees = User.where(id: @workshop.attendees.map{|a| a.faculty_id})
    render json: @attendees
  end

  def create
    @workshop = Workshop.new(workshop_params)

    if @workshop.save
      render json: @workshop, status: :created
    else
      render json: @workshop.errors, status: :unprocessable_entity
    end
  end

  def update
    if @workshop.update(workshop_params)
      render json: @workshop, status: :ok
    else
      render json: @workshop.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @workshop.destroy
  end

  private
  def set_workshop
    @workshop = Workshop.friendly.find(params[:id])
  end

  def set_institution
    @institution = Institution.friendly.find(params[:institution_id])
  end

  def workshop_params
    puts "PARAMS"
    puts params.inspect
    params.require(:workshop).permit(:name, :duration, :additional_location_info, :facilitator_id, :starts_at, :description, :sign_up_deadline, :review_deadline, :institution_id, :stipend_cents, :stipend_currency, :attendee_limit)
  end
end