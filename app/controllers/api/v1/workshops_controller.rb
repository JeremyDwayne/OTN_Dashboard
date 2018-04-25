class Api::V1::WorkshopsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_workshop, only: [:show, :register, :update, :destroy]
  before_action :set_institution, only: [:send_invites]
  before_action :authenticate_inviter!, only: [:index, :attendees, :register, :send_invites, :create, :update, :destroy]

  def resource_name
    :user
  end

  def index
    # @workshops = Workshop.where(institution_id: @current_user.institution_id)
    facilitating = Workshop.where(facilitator_id: @current_user.id).order(starts_at: :desc)
    attendees = Workshop.joins(:attendees).where("attendees.faculty_id = ?", @current_user.id).order(starts_at: :desc)
    # workshops = Workshop.joins(:attendees).where("attendees.faculty_id = ? or facilitator_id = ?", @current_user.id, @current_user.id).order(starts_at: :desc)
    workshops = attendees + facilitating
    render json: WorkshopSerializer.new(workshops).serialized_json
  end

  def show
    render json: WorkshopSerializer.new(@workshop).serialized_json
  end

  def attendees
    @attendees = @workshop.attendees.map{|a| a.faculty}
    render json: @attendees
  end

  def register
    @attendee = @workshop.attendees.where(faculty: current_user).first_or_initialize

    if @attendee.save
      render json: @attendee, status: :created
    else
      render json: @attendee.errors.full_messages, status: :unprocessable_entity
    end
  end

  def send_invites
    params[:invitees].each do |invitee|
      User.invite!(first_name: invitee['first_name'], last_name: invitee['last_name'], 
                   email: invitee['email'], institution_id: @institution.id, 
                   invited_workshop_id: params[:workshop_id])
    end
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
    @workshop = Workshop.friendly.find(params[:id] || params[:workshop_id])
  end

  def set_institution
    @institution = Institution.friendly.find(params[:institution_slug])
  end

  def workshop_params
    params.require(:workshop).permit(:name, :duration, :additional_location_info, :facilitator_id, :starts_at, :description, :sign_up_deadline, :review_deadline, :institution_id, :stipend_cents, :stipend_currency, :attendee_limit)
  end
end
