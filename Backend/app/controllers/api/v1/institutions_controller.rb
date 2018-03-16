module Api
  module V1
    class InstitutionsController < ApplicationController
      before_action :set_institution, only: [:show, :update, :destroy]
      # before_action :set_consortium, only: [:show, :update, :destroy]

      def index
        @institutions = Institution.all
        render json: InstitutionSerializer.new(@institutions, include: [:workshops]).serialized_json
      end

      def show
        @workshops = @institution.workshops
        render json: InstitutionSerializer.new([@institution], include: [:consortium, :workshops, :faculty]).serialized_json
          # { 
          # institution: InstitutionSerializer.new(@institution, include: [:consortium]).serialized_json, 
          # workshops: WorkshopSerializer.new(@workshops, include: [:faculty]).serialized_json }
      end

      def create
        @institution = Institution.new(institution_params)

        if @institution.save
          render json: @institution, status: :created, location: @institution
        else
          render json: @institution.errors, status: :unprocessable_entity
        end
      end

      def update
        if @institution.update(institution_params)
          render json: @institution, status: :ok, location: @institution
        else
          render json: @institution.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @institution.destroy
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
  end
end
