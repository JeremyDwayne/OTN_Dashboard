class WorkshopsController < ApplicationController
  before_action :set_workshop, only: [:show, :edit, :update, :destroy]

  def index
    @workshops = Workshop.all
    # if params[:keywords].present?
    #   @keywords = params[:keywords]
    #   @workshops = Workshop.where("name like ?", @keywords)
    # else
    #   @workshops = []
    # end
    respond_to do |format|
      format.html {}
      format.json {
        render json: { workshops: @workshops }
      }
    end
  end

  def show
  end

  def new
    @workshop = Workshop.new
    @institutions = Institution.all
    @facilitators = User.all
  end
  
  def edit
  end

  def create
    @workshop = Workshop.new(workshop_params)
    @institutions = Institution.all
    @facilitators = Facilitator.all

    respond_to do |format|
      if @workshop.save
        format.html { redirect_to @workshop, notice: 'Workshop was successfully created.' }
        format.json { render :show, status: :created, location: @workshop }
      else
        puts @workshop.errors.full_messages

        format.html { render :new }
        format.json { render json: @workshop.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @workshop.update(workshop_params)
        format.html { redirect_to @workshop, notice: 'Workshop was successfully updated.' }
        format.json { render :show, status: :ok, location: @workshop }
      else
        format.html { render :edit }
        format.json { render json: @workshop.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @workshop.destroy
    respond_to do |format|
      format.html { redirect_to workshops_url, notice: 'Workshop was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_workshop
      @workshop = Workshop.find(params[:id])
    end

    def workshop_params
      params.require(:workshop).permit(:name, :description, :institution_id, :additional_location_info, :starts_at, :facilitator_id)
    end
end
