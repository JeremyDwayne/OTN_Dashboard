module Api
  module V1
    class WorkshopsController < ApplicationController
      before_action :set_workshop, only: [:show, :update, :destroy]
      # before_action :set_institution, only: [:show, :update, :destroy]

      def index
        @workshops = Workshop.all

        render json: @workshops
      end

      def show
        render json: WorkshopSerializer.new([@workshop], include: [:institution, :attendees, :facilitator]).serialized_json
      end

      def attendees
        @workshop = Workshop.friendly.find(params[:workshop_id])
        @attendees = User.where(id: @workshop.attendees.map{|a| a.faculty_id})
        render json: @attendees
      end

      def create
        @workshop = Workshop.new(workshop_params)

        if @workshop.save
          render json: @workshop, status: :created, location: @workshop
        else
          render json: @workshop.errors, status: :unprocessable_entity
        end
      end

      def update
        if @workshop.update(workshop_params)
          render json: @workshop, status: :ok, location: @workshop
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
        params.require(:workshop).permit!
      end
    end
  end
end
