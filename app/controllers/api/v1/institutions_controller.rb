class Api::V1::InstitutionsController < ApplicationController
  before_action :set_institution, only: [:show, :update, :destroy]
  # before_action :set_consortium, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    @institutions = Institution.all
    render json: InstitutionSerializer.new(@institutions).serialized_json
  end

  def show
    render json: InstitutionSerializer.new(@institution).serialized_json
  end

  def create
    @institution = Institution.new(institution_params)

    if @institution.save
      render json: @institution, status: :created
    else
      render json: @institution.errors, status: :unprocessable_entity
    end
  end

  def update
    if @institution.update(institution_params)
      render json: @institution, status: :ok
    else
      render json: @institution.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @institution.destroy
  end

  def facilitators
    @institution = Institution.friendly.find(params[:institution_id])
    facilitators = @institution.facilitators
    admin = @institution.consortium.admin
    if admin.nil? && facilitators.empty?
      facilitators = SuperAdmin.all
    else
      facilitators << admin
    end
    render json: FacilitatorSerializer.new(facilitators).serialized_json
  end

  private
  def set_institution
    @institution = Institution.friendly.find(params[:id])
  end

  def set_consortium
    @consortium = Consortium.friendly.find(params[:consortium_id])
  end

  def institution_params
    params.require(:institution).permit(:name, :address_line_1, :address_line_2, :city, :state, :zip, :consortium_id)
  end
end
