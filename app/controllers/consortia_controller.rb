class ConsortiaController < ApplicationController
  before_action :set_consortium, only: [:show, :edit, :update, :destroy]

  def index
    @consortia = Consortium.all
  end

  def show
  end

  def new
    @consortium = Consortium.new
  end
  
  def edit
  end

  def create
    @consortium = Consortium.new(consortium_params)

    respond_to do |format|
      if @consortium.save
        format.html { redirect_to @consortium, notice: 'Consortium was successfully created.' }
        format.json { render :show, status: :created, location: @consortium }
      else
        format.html { render :new }
        format.json { render json: @consortium.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @consortium.update(consortium_params)
        format.html { redirect_to @consortium, notice: 'Consortium was successfully updated.' }
        format.json { render :show, status: :ok, location: @consortium }
      else
        format.html { render :edit }
        format.json { render json: @consortium.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @consortium.destroy
    respond_to do |format|
      format.html { redirect_to consortia_url, notice: 'Consortium was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_consortium
      @consortium = Consortium.find(params[:id])
    end

    def consortium_params
      params.require(:consortium).permit(:name, :state)
    end
end
