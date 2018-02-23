class InstitutionsController < ApplicationController
  before_action :set_institution, only: [:show, :edit, :update, :destroy]

  def index
    @institutions = Institution.all
  end

  def show
  end

  def new
    @institution = Institution.new
    @consortia = Consortium.all
  end
  
  def edit
  end

  def create
    @institution = Institution.new(institution_params)
    @consortia = Consortium.all

    respond_to do |format|
      if @institution.save
        format.html { redirect_to @institution, notice: 'Institution was successfully created.' }
        format.json { render :show, status: :created, location: @institution }
      else
        format.html { render :new }
        format.json { render json: @institution.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @institution.update(institution_params)
        format.html { redirect_to @institution, notice: 'Institution was successfully updated.' }
        format.json { render :show, status: :ok, location: @institution }
      else
        format.html { render :edit }
        format.json { render json: @institution.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @institution.destroy
    respond_to do |format|
      format.html { redirect_to institutions_url, notice: 'Institution was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_institution
      @institution = Institution.friendly.find(params[:id])
    end

    def institution_params
      params.require(:institution).permit(:name, :address_line_1, :address_line_2, :city, :state, :zip, :consortium_id)
    end
end
